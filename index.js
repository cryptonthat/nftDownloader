


//Set your 42 character contract address here
const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

//Set your blockchain here, you must use one of these options
//"ETHEREUM" "POLYGON" "FLOW" "TEZOS" "SOLANA" "IMMUTABLEX"
const blockchain = "ETHEREUM";

//Set delay time here, do not decrease, increase if script fails due to 429 server codes
const delayTime = 500;



const nftDownloader  = require("./nftDownloader.js");
nftDownloader.run(contractAddress,blockchain,delayTime);