const { ethers } = require("ethers");
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`)

/* Account that interact with AAVE
Your account address 1 */
const account1 = '0x7dDf03e0a413d78e88c5991668eAa01369a3d564'
// Private key of account 1
const privateKey1 = process.env.PRIVATE_KEY

// Connect Wallet to blockchain
const wallet = new ethers.Wallet(privateKey1, provider)

//ABIs
const poolAddressesProviderABI = [
    "function getPool() external view override returns (address)",
];
const wethABI = [
    "function depositETH(uint amount, address pool, address onBehalfOf) external payable",
]

//Smart Contracts
//Addresses Provider SC
const poolAdressesProvider = "0xBA6378f1c1D046e9EB0F538560BA7558546edF3C"
const poolAddressesProviderContract = new ethers.Contract(poolAdressesProvider, poolAddressesProviderABI, provider)
//WETH Smart Contract
const wethAddress = "0xD1DECc6502cc690Bc85fAf618Da487d886E54Abe"
const wethContract = new ethers.Contract(wethAddress, wethABI, provider)

const main = async () =>{
    const poolAddress = await poolAddressesProviderContract.getPool();
    
    //Balance of Link token of the account1 before the tx
    //const balance = await pool.balanceOf(account1)

    //console.log(`\nReading from ${address}\n`)
    //console.log(`Balance of sender: ${balance}\n`)

    //Connect the wallet with the contract(Link token)
    const wethConnectWithWallet = wethContract.connect(wallet)

    //Transfer the tokens
    const tx = await wethConnectWithWallet.depositETH(ethers.utils.parseEther(0.1), poolAddress, account1)
    await tx.wait()

    //Print the transaction
    console.log(tx)

    //Balance of the account after the transaction
    //const balanceOfSender = await contract.balanceOf(account1)
    //const balanceOfReciever = await contract.balanceOf(account2)

    //console.log(`\nBalance of sender: ${balanceOfSender}`)
    //console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()