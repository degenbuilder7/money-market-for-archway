# Arch Defi - Archway DeFi Money Market Contract

This project contains the implementation of a money market contract native to the Archway blockchain.

The contract allows users to deposit funds for lending, withdraw lent funds, provide collateral to borrow against, withdraw collateral, borrow funds, and repay loans.

## Features

- **Deposit**: Deposit funds for lending.
- **Withdraw**: Withdraw lent funds.
- **Provide Collateral**: Deposit collateral to borrow against.
- **Withdraw Collateral**: Withdraw collateral after repaying loans.
- **Borrow**: Borrow funds from the lending market.
- **Repay**: Repay borrowed funds to the lending market.

## Contract Structure

### State

- `Config`: Stores the contract owner.
- `Collateral`: Represents collateral deposited by borrowers.
- `Deposit`: Represents deposits made by lenders.
- `Loan`: Represents loans taken by borrowers.

### Messages

- `InstantiateMsg`: Initializes the contract with an optional owner address.
- `ExecuteMsg`: Defines the executable messages:
  - `DepositCollateral { amount, valuation }`
  - `WithdrawCollateral { amount }`
  - `AdjustValuation { new_valuation }`
  - `PayTax`
  - `LiquidateCollateral { collateral_id }`
  - `Deposit { amount }`
  - `Withdraw { amount }`
  - `Borrow { amount }`
  - `Repay { amount }`
- `QueryMsg`: Queries the state of a specific collateral using its ID.

## Usage

### Instantiate

Instantiate the contract with an optional owner address:

```json
{
  "owner": "archway1..."
}
```

### Execute

#### Deposit Collateral

Deposit collateral to borrow against:

```json
{
  "deposit_collateral": {
    "amount": "1000000",
    "valuation": "1500000"
  }
}
```

#### Withdraw Collateral

Withdraw collateral after repaying loans:

```json
{
  "withdraw_collateral": {
    "amount": "500000"
  }
}
```

#### Adjust Valuation

Adjust the valuation of the deposited collateral:

```json
{
  "adjust_valuation": {
    "new_valuation": "1600000"
  }
}
```

#### Pay Tax

Pay taxes on the collateral:

```json
{
  "pay_tax": {}
}
```

#### Liquidate Collateral

Liquidate collateral of a borrower:

```json
{
  "liquidate_collateral": {
    "collateral_id": "12345"
  }
}
```

#### Deposit

Deposit funds for lending:

```json
{
  "deposit": {
    "amount": "1000000"
  }
}
```

#### Withdraw

Withdraw lent funds:

```json
{
  "withdraw": {
    "amount": "500000"
  }
}
```

#### Borrow

Borrow funds from the lending market:

```json
{
  "borrow": {
    "amount": "700000"
  }
}
```

#### Repay

Repay borrowed funds to the lending market:

```json
{
  "repay": {
    "amount": "700000"
  }
}
```

### Query

Query the state of a specific collateral using its ID:

```json
{
  "collateral_id": "12345"
}
```

## Development

### Prerequisites

- Rust
- Cargo
- Archway SDK

### Building

Build the contract:

```bash
cargo build --release
```

### Testing

Run tests:

```bash
cargo test
```

### Schema Generation

Generate JSON schemas for the contract messages:

```bash
cargo run --bin schema
```

## License

This project is licensed under the MIT License.

## Acknowledgements

This contract is inspired by various DeFi lending protocols and adapted for use on the Archway blockchain.

Feel free to reach out with any questions or suggestions for improvement!