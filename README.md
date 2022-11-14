# Majority Judgement Voting System
This project represent majority judgement voting system with delegation proposed by Michel Balinski and Rida Laraki. It is a highest median rule, a cardinal voting system that elects the candidate with the highest median rating. 
For more details please refer: [Majority judgment](https://en.wikipedia.org/wiki/Majority_judgment) and [Tie-breaking the Highest Median](https://www.parisschoolofeconomics.eu/docs/fabre-adrien/tie-breaking-highest-median--revision-2(1).pdf)



## Setup project

Copy `.env.example` and rename it to `.env`. Fill in all the variables there.

Install dependencies

```sh
yarn install
```

Additionally [install](https://hardhat.org/guides/shorthand.html) `hh` shortcut to save some typing.
`hh` is equivalent to `yarn hardhat`.

```sh
yarn add --dev hardhat-shorthand
```

## Compile contracts

```sh
hh compile
```

## Run tests

```sh
hh test
```

## Run tests with coverage

```sh
hh coverage
```

Open `coverage/index.html` in the browser.

## Auto audit with slither

To audit all contracts, use the command :

```sh
slither .
```

To exclude warnings in subsequent audits, use :

```sh
slither . --triage
```

## Deploy

You should specify the network you want to deploy to. Replace `<network>` in any of the commands below with
the network of your choice(e.g., `goerli`).

### Deploy VoteContract

```sh
hh --network <network> deploy --tags vote
```

## Verify

Once you deployed vote smart contract to testnet or mainnet of ethereum


## Docs

You can create documentation for the code automatically.


```sh
hh docgen
```
