//NFT Downloader

//A simple script for downloading all nft images from a collection to local storage
const axios = require('axios').default;
const fs = require('fs')
const basePath = process.cwd();
const outDir = `${basePath}/output`;
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const width = 1028
const height = 1028
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//Reset/Create output directory
const outputSetup = () => {
	//Check if directory exists, remove if it does
	if (fs.existsSync(outDir)) {
    	fs.rmSync(outDir, { recursive: true });
 	}
 	//Create new directory
  	fs.mkdirSync(outDir);
};

const saveJson = (array) => {
	const data = JSON.stringify(array);
	fs.writeFile('meta.json', data, (err) => {
    	if (err) {
        	throw err;
    	}
    console.log("JSON data is saved.");
	});
}

const getAllNfts = async (blockchain, address, continuation=null,_array=[]) => {

	let array = _array;
	let response = {}

	if (continuation===null) {

		response = await axios.get(`http://api.rarible.org/v0.1/items/byCollection?collection=${blockchain}%3A${address}&size=1000`).then((response) => response)

    } else {

    	response = await axios.get(`http://api.rarible.org/v0.1/items/byCollection?collection=${blockchain}%3A${address}&size=1000&continuation=${continuation}`).then((response) => response)

    }

    response.data.items.forEach((item) => {
    	array.push(item)
    })

    if (response.data.continuation) {
        await getAllNfts(blockchain, address, response.data.continuation, array);
    } else {
        console.log("API Fetch Complete\nDownload Starting")
        return array
    }

    return array

}

const downloadNfts = async (array, directory,sleeptime) => {

	for (let x = 0; x<array.length; x++) {
		if (array[x].meta.content[0]){
		let url = array[x].meta.content[0].url
		if (url.slice(0,4) === "ipfs"){
                let container = url.slice(7)
                url = "cloudflare-ipfs.com/ipfs/"+container
            }
		loadImage(url).then((image) => {

			ctx.drawImage(image,0,0,width,height)
			const buffer = canvas.toBuffer("image/png");
			fs.writeFileSync(`${directory}/${array[x].tokenId}.png`, buffer);
			console.log(`Token ID: ${array[x].tokenId} saved`)

		}).catch((error)=>{
			console.log(error)
			return
		})

		await sleep(sleeptime)

		}
	}

}

const run = async (contractAddress,blockchain,sleeptime) => {
	//RUNTIME
outputSetup();
const array =await getAllNfts(blockchain,contractAddress)
downloadNfts(array,outDir,sleeptime);

}

module.exports = {
    run
  };

