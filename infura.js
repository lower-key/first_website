const contractAddress = '0x6227D189e77eE79b05990fA683ffd1fe46deB41B'; // Replace with your contract's address
const contractABI = [
	{
		"inputs": [],
		"name": "dec",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "inc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "count",
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
		"inputs": [],
		"name": "get",
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

const providerUrl = 'https://polygon-mumbai.infura.io/v3/8c13c6be5afa44769076b36a0228320a';

// Create a provider using Infura
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = provider.getSigner()
console.log(provider)
console.log(signer)

// Get the latest Ethereum block number
provider.getBlockNumber().then((result) => {
  console.log('Latest Block is', result);
});

// Set the contract address and ABI
// const contractAddress = '0x6227D189e77eE79b05990fA683ffd1fe46deB41B'; // Replace with your contract's address
// const contractABI = [ /* Your contract's ABI here */ ];

// Connect to the signer (MetaMask account)
async function connectToSigner() {
    try {
      // Request access to MetaMask account
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  
      // Create a provider using MetaMask's provider
      const provider = new ethers.providers.Web3Provider(ethereum);
  
      // Get the signer (MetaMask account)
      const signer = provider.getSigner();
  
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Add event listeners for your buttons
      const getCountBtn = document.querySelector('.getCountButton');
      getCountBtn.addEventListener('click', async () => {
        const result = await contract.get();
        console.log('Count from the contract:', result.toString());
      });
  
      const getIncBtn = document.querySelector('.getIncButton');
      getIncBtn.addEventListener('click', async () => {
        try {
          const transaction = await contract.inc();
          await transaction.wait();
          console.log('Increment transaction complete!');
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Initialize the connection to the signer when the page loads
  window.addEventListener('load', () => {
    connectToSigner();
  });