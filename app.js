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
const contractAddress = "0xb9421be1f098857f22b25924878d8835b40f4441e0ef333d78028e8457371b13";

// Contract ABI (Application Binary Interface)
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "result",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountWon",
                "type": "uint256"
            }
        ],
        "name": "CoinFlipped",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "flipCoin",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawContractBalance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawWinnings",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "winnings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract Instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Send Funds to Contract
document.getElementById('sendFundsBtn').addEventListener('click', async () => {
    try {
        // Get the token amount entered by the user
        const tokenAmount = document.getElementById('tokenAmount').value.trim();
        if (!tokenAmount || isNaN(tokenAmount) || tokenAmount <= 0) {
            throw new Error("Invalid token amount");
        }

        // Send funds to the contract
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: contractAddress,
                from: window.ethereum.selectedAddress,
                value: web3.utils.toWei(tokenAmount, "ether") // Assuming token is in ether, adjust as necessary
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
