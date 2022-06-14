const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`)

// Your account address 1
const account1 = '0x7dDf03e0a413d78e88c5991668eAa01369a3d564'

// Private key of account 1
const privateKey1 = process.env.PRIVATE_KEY
// Connect Wallet to blockchain
const wallet = new ethers.Wallet(privateKey1, provider)

//ABI that contains the functions of the smart contract
const accessControlABI = [
    "function depositETH(uint amount, address pool, address onBehalfOf) external payable",
];
//WETH address contract
const contractAddress= "0xD1DECc6502cc690Bc85fAf618Da487d886E54Abe"
const contract = new ether.contract(contractAddress, accessControlABI, provider)

const main = async () => {
    //Balance of Link token of the account1 before the tx
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    //Connect the wallet with the contract(Link token)
    const contractWithWallet = contract.connect(wallet)

    //Transfer the tokens
    const tx = await contractWithWallet.depositETH(ethers.utils.parseEther(0.1), )
    await tx.wait()

    //Print the transaction
    console.log(tx)

    //Balance of the account after the transaction
    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()