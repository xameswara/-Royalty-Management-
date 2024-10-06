# Ethereum Royalty Management System

This project implements a simple royalty management system on the Ethereum blockchain using Solidity smart contracts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed [Node.js](https://nodejs.org/) (version 12.0 or later)
* You have installed [npm](https://www.npmjs.com/) (usually comes with Node.js)
* You have a basic understanding of Ethereum and smart contracts

## Installation

To install the Ethereum Royalty Management System, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/xameswara/royalty-management.git
   ```

2. Navigate to the project directory:
   ```
   cd royalty-management
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Install Truffle globally:
   ```
   npm install -g truffle
   ```

## Running the project

To run the Ethereum Royalty Management System, follow these steps:

1. Start a local Ethereum network (like Ganache) or connect to a testnet.

2. Compile the smart contracts:
   ```
   truffle compile
   ```

3. Deploy the contracts to the network:
   ```
   truffle migrate
   ```

4. Run the tests:
   ```
   truffle test
   ```

## Using the Royalty Management System

After deploying the contracts, you can interact with the Royalty Management System using Truffle console or by building a frontend application.

Here are some example interactions using Truffle console:

1. Open Truffle console:
   ```
   truffle console
   ```

2. Get the deployed contract instance:
   ```javascript
   let instance = await RoyaltyManagement.deployed()
   ```

3. Mint a new token with royalty:
   ```javascript
   let accounts = await web3.eth.getAccounts()
   let result = await instance.mintWithRoyalty(accounts[1], 10, { from: accounts[0] })
   ```

4. Pay royalty for a token:
   ```javascript
   await instance.payRoyalty(1, { from: accounts[2], value: web3.utils.toWei("1", "ether") })
   ```

5. Get royalty information for a token:
   ```javascript
   let royaltyInfo = await instance.getRoyaltyInfo(1)
   console.log("Creator:", royaltyInfo[0])
   console.log("Royalty Percentage:", royaltyInfo[1].toString())
   ```

## Contributing to Ethereum Royalty Management System

To contribute to the Ethereum Royalty Management System, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

## License

This project uses the following license: [MIT License](<link_to_license>).
