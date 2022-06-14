const { ethers } = require("ethers");

const INFURA_ID = '71c5dae369e94388a953a47b5fcf6465'
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const address = '0x7dDf03e0a413d78e88c5991668eAa01369a3d564'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()

