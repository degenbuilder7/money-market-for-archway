use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: Option<String>,
}

#[cw_serde]
pub enum ExecuteMsg {
    DepositCollateral { amount: Uint128, valuation: Uint128 },
    WithdrawCollateral { amount: Uint128 },
    AdjustValuation { new_valuation: Uint128 },
    PayTax {},
    LiquidateCollateral { collateral_id: String },
    Deposit { amount: Uint128 },
    Withdraw { amount: Uint128 },
    Borrow { amount: Uint128 },
    Repay { amount: Uint128 },
}

#[cw_serde]
pub struct QueryMsg {
    pub collateral_id: String,
}
