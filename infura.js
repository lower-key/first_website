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
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Get the latest Ethereum block number
provider.getBlockNumber().then((result) => {
  console.log('Latest Block is', result);
});

import ABI from './nft.js';

const getNFTcount = document.querySelector('.getNFTcount');
getNFTcount.addEventListener('click', async () => {
    const nft_address = '0xCB5B66C0B3a8510eEA1279ec19eC53cE78Ef874b'
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftcontract = new ethers.Contract(nft_address, ABI, signer);
    console.log(nftcontract)
    const result = await nftcontract.getTotalSupply();
    console.log('Count from the contract:', result.toString());
});

const testbtn1 = document.querySelector('.getownertest');
testbtn1.addEventListener('click', async () => {
    getOwnedNFTs();
});


const getmycount = document.querySelector('.getmycount');
getmycount.addEventListener('click', async () => {
    const nft_address = '0xCB5B66C0B3a8510eEA1279ec19eC53cE78Ef874b'
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftcontract = new ethers.Contract(nft_address, ABI, signer);
    console.log(nftcontract)
    const result = await nftcontract.balanceOf(getAccount());
    console.log('Your Count', result.toString());
    // const transaction = await nftcontract.mintNFT({ value: ethers.utils.parseUnits("1", "wei") });
    // await transaction.wait();
    // console.log('NFT minted successfully.');
});

const mintNFT = document.querySelector('.mint-nft');
mintNFT.addEventListener('click', async () => {
    const nft_address = '0xCB5B66C0B3a8510eEA1279ec19eC53cE78Ef874b'
    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftcontract = new ethers.Contract(nft_address, ABI, signer);
    console.log(nftcontract)
    // const result = await nftcontract.balanceOf(getAccount());
    // console.log('Your Count', result.toString());
    const transaction = await nftcontract.mintNFT({ value: ethers.utils.parseUnits("1", "wei") });
    await transaction.wait();
    console.log('NFT minted successfully.');
});


async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    return account
    }



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
        console.log(contract)
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
  
  async function getWalletBalance() {
    if (typeof window.ethereum !== 'undefined') {
      // Initialize ethers.js provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      // Get the connected signer's address
      const signer = provider.getSigner();
      const address = await signer.getAddress();
  
      // Get the balance of the address
      const balance = await provider.getBalance(address);
  
      // Convert the balance to Ether
      const etherBalance = ethers.utils.formatEther(balance);
  
      console.log(`Wallet Address: ${address}`);
      console.log(`Wallet Balance: ${etherBalance} ETH`);
    } else {
      console.error('MetaMask or similar wallet not detected.');
    }
  }

  async function getOwnedNFTs() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContractAddress = '0xCB5B66C0B3a8510eEA1279ec19eC53cE78Ef874b';
      const nftContract = new ethers.Contract(nftContractAddress, ABI, signer);
      const address = await signer.getAddress();
      const ownedNFTs = [];

  
      // Get the balance of NFTs owned by the address
      const balance = await nftContract.balanceOf(address);
      console.log('total NFTs: ',balance.toString())
  
      for (let tokenId = 1; tokenId <= balance.toString(); tokenId++) {
        const result = await nftContract.ownerOf(tokenId);
    
        if (result === address) {
            console.log(`Token ID ${tokenId} is owned by ${address}`);
            ownedNFTs.push(tokenId);
            // You can perform actions on the owned NFT here.
        }
    }
    return ownedNFTs;
    } else {
      console.error('MetaMask or similar wallet not detected.');
    }
    
  }
  
  async function renderTop3NFTs() {
    const ownedNFTs = await getOwnedNFTs();
    const top3NFTs = ownedNFTs.slice(0, 3); // Get the first 3 NFTs
  
    const nftListContainer = document.getElementById('nftList');
    nftListContainer.innerHTML = ''; // Clear the container
  
    top3NFTs.forEach((tokenId) => {
      // Create an HTML element to display each NFT
      const nftElement = document.createElement('div');
      nftElement.innerHTML = `NFT #${tokenId}`;
      nftElement.className = 'nft-item'; // Apply Bootstrap classes or custom styling
  
      nftListContainer.appendChild(nftElement);
    });
  }

  async function getHistoricalEvents() {
    const fromBlock = 0; // Starting block number (0 means the genesis block)
    const toBlock = 'latest'; // Retrieve events up to the latest block

    const providerUrl = 'https://polygon-mumbai.infura.io/v3/8c13c6be5afa44769076b36a0228320a';
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContractAddress = '0xCB5B66C0B3a8510eEA1279ec19eC53cE78Ef874b';
    const nftContract = new ethers.Contract(nftContractAddress, ABI, signer);
    const mintNFTEventFilter = nftContract.filters.Transfer(null, null);

    const events = await nftContract.queryFilter(nftContract.filters.Transfer(null, null));
if (events.length > 0) {
  // Access and process the events
  events.forEach(event => {
    console.log('Event:', event);
  });
} else {
  console.log('No events found matching the filter criteria.');
}

    const logs = await provider.getLogs({
        fromBlock,
        toBlock,
        address: nftContract.address,
        topics: mintNFTEventFilter.topics,
    });

    logs.forEach(log => {
        const parsedLog = nftContract.interface.parseLog(log);
        console.log(parsedLog); // This will contain the event data
    });
}
  


  // Initialize the connection to the signer when the page loads
  window.addEventListener('load', () => {
    connectToSigner();
    getWalletBalance();
    getOwnedNFTs();
    renderTop3NFTs();
    getHistoricalEvents();
  });