# NFT Downloader

Save a full collection of NFT images with this script. Add a contract address and watch in awe as the entire collection is downloaded to your hard drive.

## Installation

Install all dependencies with `npm install`.

## Usage

Locate index.js file

Set the **ContractAddress** _variable_ to the 42 character contract address of the collection you want to download.

Set the **Blockchain** _variable_ to one of the supported blockchains.

This script has a 500ms second delay between image fetch requests, this is to avoid 429 codes.

A Collection of _10,000_ items will take around **170** minutes to download.

Some servers have different rate limits. If the script fails due to 429 server codes, locate the **delayTime** variable, increase this until the error is resolved,

## Supported Blockchains

```shell
"ETHEREUM" "POLYGON" "FLOW" "TEZOS" "SOLANA" "IMMUTABLEX"
```

## Runtime

run `npm start`

```shell
npm start
```
