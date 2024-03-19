// Connect to MetaMask
window.addEventListener('load', async () => {
    if (window.ethereum) {
        try {
            // Initialize Web3 with MetaMask's provider
            const web3 = new Web3(window.ethereum);

            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask");
        } catch (error) {
            console.error("User denied account access:", error);
        }
    } else {
        console.error("MetaMask not detected!");
    }
});

// Contract Address
const contractAddress = "0x19365005A38457ff7aA5dce8452A0d768Eb637e3";

// Contract ABI (Application Binary Interface)
const contractABI = [
    // Your contract ABI here...
];

// Contract Instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Send Funds to Contract
document.getElementById('sendFundsBtn').addEventListener('click', async () => {
    try {
        // Prompt the user for the amount to spend
        const amount = prompt("Enter the amount to spend:");
        if (amount === null || isNaN(amount) || amount <= 0) {
            throw new Error("Invalid amount");
        }

        // Send funds to the contract
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: contractAddress,
                from: window.ethereum.selectedAddress,
                value: web3.utils.toWei(amount, "ether")
            }]
        });
        console.log("Funds sent to contract");
    } catch (error) {
        console.error("Error sending funds:", error);
    }
});

// Flip Coin
document.getElementById('flipCoinBtn').addEventListener('click', async () => {
    try {
        // Send transaction to initialize the flip
        await contract.methods.flipCoin().send({ from: window.ethereum.selectedAddress });
        console.log("Coin flip initialized");
    } catch (error) {
        console.error("Error initializing coin flip:", error);
    }
});

// Withdraw Winnings
document.getElementById('withdrawBtn').addEventListener('click', async () => {
    try {
        // Withdraw winnings from the contract
        await contract.methods.withdrawWinnings().send({ from: window.ethereum.selectedAddress });
        console.log("Winnings withdrawn");
    } catch (error) {
        console.error("Error withdrawing winnings:", error);
    }
});
