#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, BankMsg, Coin, DepsMut, Env, MessageInfo, Response, StdResult, Uint128, WasmMsg, StdError
};
use crate::msg::{ExecuteMsg, InstantiateMsg};
use crate::state::{Config, CONFIG, COLLATERAL_STATE, Collateral, DEPOSITS, Deposit, LOANS, Loan};
use cw20::Cw20ExecuteMsg;
use crate::ContractError;
use cw2::set_contract_version;

const CONTRACT_NAME: &str = "crates.io:archdefi";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let owner = msg
        .owner
        .and_then(|addr_string| deps.api.addr_validate(addr_string.as_str()).ok())
        .unwrap_or(info.sender);

    let config = Config {
        owner: owner.clone(),
    };

    CONFIG.save(deps.storage, &config)?;
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", owner))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::DepositCollateral { amount, valuation } => {
            deposit_collateral(deps, env, info, amount, valuation)
        }
        ExecuteMsg::WithdrawCollateral { amount } => withdraw_collateral(deps, env, info, amount),
        ExecuteMsg::AdjustValuation { new_valuation } => adjust_valuation(deps, info, new_valuation),
        ExecuteMsg::PayTax {} => pay_tax(deps, env, info),
        ExecuteMsg::LiquidateCollateral { collateral_id } => liquidate_collateral(deps, info, collateral_id),
        ExecuteMsg::Deposit { amount } => deposit_funds(deps, env, info, amount),
        ExecuteMsg::Withdraw { amount } => withdraw_funds(deps, env, info, amount),
        ExecuteMsg::Borrow { amount } => borrow_funds(deps, env, info, amount),
        ExecuteMsg::Repay { amount } => repay_funds(deps, env, info, amount),
    }
}

fn deposit_collateral(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
    valuation: Uint128,
) -> StdResult<Response> {
    let collateral_id = format!("{}-{}", env.block.height, info.sender); // Create a unique ID

    let collateral = Collateral {
        id: collateral_id.clone(),
        token: "CONST".to_string(), // Hardcoded to only accept CONST
        amount,
        valuation,
        last_tax_payment: env.block.time.seconds(),
        borrower: info.sender.clone(),
    };

    // Save the collateral into the state
    COLLATERAL_STATE.save(deps.storage, &collateral_id, &collateral)?;

    // Handle CONST tokens
    if let Some(fund) = info.funds.iter().find(|coin| coin.denom == "CONST") {
        if fund.amount < amount {
            return Err(StdError::generic_err("Insufficient CONST tokens sent"));
        }

        let transfer_msg = BankMsg::Send {
            to_address: env.contract.address.to_string(),
            amount: vec![Coin {
                denom: "CONST".to_string(),
                amount,
            }],
        };

        return Ok(Response::new()
            .add_message(transfer_msg)
            .add_attribute("method", "deposit_collateral")
            .add_attribute("collateral_id", collateral_id));
    } else {
        return Err(StdError::generic_err("No CONST tokens sent"));
    }
}

fn withdraw_collateral(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> StdResult<Response> {
    // Fetch the collateral details
    let mut collateral = COLLATERAL_STATE.load(deps.storage, &info.sender.to_string())?;
    
    // Check if the amount to withdraw is less than or equal to the collateral amount
    if amount > collateral.amount {
        return Err(StdError::generic_err("Insufficient collateral to withdraw"));
    }

    // Decrease the collateral amount
    collateral.amount -= amount;
    COLLATERAL_STATE.save(deps.storage, &info.sender.to_string(), &collateral)?;

    // Create a transfer message to return the collateral
    let transfer_msg = BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: vec![Coin {
            denom: "CONST".to_string(),
            amount,
        }],
    };

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attribute("method", "withdraw_collateral")
        .add_attribute("amount", amount.to_string()))
}

fn adjust_valuation(
    deps: DepsMut,
    info: MessageInfo,
    new_valuation: Uint128,
) -> StdResult<Response> {
    let mut collateral = COLLATERAL_STATE.load(deps.storage, &info.sender.to_string())?;
    collateral.valuation = new_valuation;
    COLLATERAL_STATE.save(deps.storage, &info.sender.to_string(), &collateral)?;

    Ok(Response::new().add_attribute("method", "adjust_valuation"))
}

fn pay_tax(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
) -> StdResult<Response> {
    let mut collateral = COLLATERAL_STATE.load(deps.storage, &info.sender.to_string())?;
    let elapsed_time = env.block.time.seconds() - collateral.last_tax_payment;
    let config = CONFIG.load(deps.storage)?;
    // let tax_due = collateral.valuation.u128() * elapsed_time as u128 * config.tax_rate as u128 / 10000; // Simplified tax calculation
    // Logic to deduct tax from borrower
    collateral.last_tax_payment = env.block.time.seconds();
    COLLATERAL_STATE.save(deps.storage, &info.sender.to_string(), &collateral)?;

    Ok(Response::new().add_attribute("method", "pay_tax"))
}

fn liquidate_collateral(
    deps: DepsMut,
    info: MessageInfo,
    collateral_id: String,
) -> StdResult<Response> {
    let collateral = COLLATERAL_STATE.load(deps.storage, &collateral_id)?;
    COLLATERAL_STATE.remove(deps.storage, &collateral_id);

    // Transfer collateral to the liquidator
    let transfer_msg = BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: vec![Coin {
            denom: collateral.token.clone(),
            amount: collateral.amount,
        }],
    };

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attribute("method", "liquidate_collateral")
        .add_attribute("status", "success"))
}

fn deposit_funds(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> StdResult<Response> {
    let depositor = info.sender.clone();

    // Handle CONST tokens
    if let Some(fund) = info.funds.iter().find(|coin| coin.denom == "CONST") {
        if fund.amount < amount {
            return Err(StdError::generic_err("Insufficient CONST tokens sent"));
        }

        let deposit = Deposit {
            depositor: depositor.clone(),
            amount,
        };

        DEPOSITS.save(deps.storage, &depositor, &deposit)?;

        let transfer_msg = BankMsg::Send {
            to_address: env.contract.address.to_string(),
            amount: vec![Coin {
                denom: "CONST".to_string(),
                amount,
            }],
        };

        return Ok(Response::new()
            .add_message(transfer_msg)
            .add_attribute("method", "deposit")
            .add_attribute("amount", amount.to_string()));
    } else {
        return Err(StdError::generic_err("No CONST tokens sent"));
    }
}

fn withdraw_funds(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> StdResult<Response> {
    let depositor = info.sender.clone();
    let deposit = DEPOSITS.load(deps.storage, &depositor)?;

    if amount > deposit.amount {
        return Err(StdError::generic_err("Insufficient deposited funds to withdraw"));
    }

    let remaining_amount = deposit.amount - amount;
    let updated_deposit = Deposit {
        depositor: depositor.clone(),
        amount: remaining_amount,
    };

    DEPOSITS.save(deps.storage, &depositor, &updated_deposit)?;

    let transfer_msg = BankMsg::Send {
        to_address: depositor.to_string(),
        amount: vec![Coin {
            denom: "CONST".to_string(),
            amount,
        }],
    };

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attribute("method", "withdraw")
        .add_attribute("amount", amount.to_string()))
}

fn borrow_funds(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> StdResult<Response> {
    let borrower = info.sender.clone();

    // Ensure borrower has enough collateral
    let collateral = COLLATERAL_STATE.load(deps.storage, &borrower.to_string())?;
    if collateral.valuation < amount {
        return Err(StdError::generic_err("Insufficient collateral for borrowing"));
    }

    let loan = Loan {
        borrower: borrower.clone(),
        amount,
    };

    LOANS.save(deps.storage, &borrower, &loan)?;

    let transfer_msg = BankMsg::Send {
        to_address: borrower.to_string(),
        amount: vec![Coin {
            denom: "CONST".to_string(),
            amount,
        }],
    };

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attribute("method", "borrow")
        .add_attribute("amount", amount.to_string()))
}

fn repay_funds(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    amount: Uint128,
) -> StdResult<Response> {
    let borrower = info.sender.clone();
    let loan = LOANS.load(deps.storage, &borrower)?;

    if amount > loan.amount {
        return Err(StdError::generic_err("Repay amount exceeds loan amount"));
    }

    let remaining_amount = loan.amount - amount;
    let updated_loan = Loan {
        borrower: borrower.clone(),
        amount: remaining_amount,
    };

    LOANS.save(deps.storage, &borrower, &updated_loan)?;

    if remaining_amount == Uint128::zero() {
        LOANS.remove(deps.storage, &borrower);
    }

    let transfer_msg = BankMsg::Send {
        to_address: env.contract.address.to_string(),
        amount: vec![Coin {
            denom: "CONST".to_string(),
            amount,
        }],
    };

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attribute("method", "repay")
        .add_attribute("amount", amount.to_string()))
}
