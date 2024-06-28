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

### The contract includes functionalities for handling collateralized borrowing and lending of a token named "CONST". Here’s a breakdown of how the contract operates and how much a user can borrow given a $10 collateral:

1. **Collateral Management**: 
   - Users can deposit CONST tokens as collateral (`deposit_collateral` function).
   - They can withdraw deposited collateral (`withdraw_collateral` function).
   - Collateral valuation can be adjusted (`adjust_valuation` function).
   - Taxes can be paid on collateral (`pay_tax` function).
   - Collateral can be liquidated (`liquidate_collateral` function).

2. **Funds Management**:
   - Users can deposit CONST tokens (`deposit_funds` function).
   - They can withdraw deposited tokens (`withdraw_funds` function).
   - Users can borrow CONST tokens against their deposited collateral (`borrow_funds` function).
   - They can repay borrowed tokens (`repay_funds` function).

3. **Borrowing Limit Calculation**:
   - The borrowing capability typically depends on the collateral valuation (`collateral.valuation`) and the requested loan amount (`amount`).
   - In the `borrow_funds` function, there is a check to ensure that the collateral's valuation is greater than or equal to the requested loan amount (`if collateral.valuation < amount`).

Given this setup, if a user wants to borrow CONST tokens, they need to deposit collateral valued sufficiently high relative to the amount they wish to borrow. For example, if a user deposits $10 worth of CONST tokens as collateral, the borrowing limit depends on how the contract determines the valuation of this collateral (`collateral.valuation`). Typically, the contract would enforce a borrowing limit that doesn't exceed a certain fraction (like 50% or 70%) of the collateral's valuation to ensure safety and to account for potential fluctuations in token value.

### Borrowing Limit Calculation Example:

Let's assume:
- User deposits $10 worth of CONST tokens.
- The contract determines the collateral's valuation (`collateral.valuation`) to be $12.

If the contract allows borrowing up to 50% of the collateral's valuation:
- Borrowing limit = 50% of $12 = $6.

Therefore, in this scenario, the user could borrow up to $6 worth of CONST tokens.

### Tax payments in this smart contracts serve essential purposes ranging from revenue generation to risk management and compliance. They play a crucial role in sustaining the contract’s operations, incentivizing responsible use of resources, and contributing to the broader economic stability of the decentralized ecosystem in which they operate.

Usefulness of Tax Payments

- Sustainability and Maintenance: Tax payments help sustain the operation of the smart contract by collecting fees. These fees can cover the costs associated with contract execution, such as computational resources used by validators or oracles.

- Risk Management: Tax payments can act as a risk management tool. By imposing fees on collateral, the contract ensures that borrowers are incentivized to manage their positions effectively. This discourages users from holding excessive amounts of collateral without actively using them for borrowing, thus reducing systemic risk.

- Revenue Generation: Depending on the contract design, tax payments may generate revenue for the contract owner or community governance. This revenue can be used to fund further development, community incentives, or ecosystem growth.

- Compliance and Regulation: In some cases, tax payments might also serve regulatory compliance purposes. For example, in decentralized finance (DeFi) applications, taxes could represent regulatory fees or compliance costs that the contract needs to cover to operate legally.

Economic Stability: By periodically deducting taxes, the contract stabilizes the economic environment within its ecosystem. This stabilization can help mitigate volatility and ensure a more predictable environment for borrowers and lenders alike.

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
