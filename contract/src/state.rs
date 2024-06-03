use cosmwasm_std::{Addr, Uint128};
use cosmwasm_schema::cw_serde;
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[cw_serde]
pub struct Config {
    pub owner: Addr,
}

#[cw_serde]
pub struct Collateral {
    pub id: String,
    pub token: String,
    pub amount: Uint128,
    pub valuation: Uint128,
    pub last_tax_payment: u64,
    pub borrower: Addr,
}

#[cw_serde]
pub struct Deposit {
    pub depositor: Addr,
    pub amount: Uint128,
}

#[cw_serde]
pub struct Loan {
    pub borrower: Addr,
    pub amount: Uint128,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const COLLATERAL_STATE: Map<&str, Collateral> = Map::new("collateral_state");
pub const DEPOSITS: Map<&Addr, Deposit> = Map::new("deposits");
pub const LOANS: Map<&Addr, Loan> = Map::new("loans");
