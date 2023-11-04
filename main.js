// main.js
function setupThemeToggle() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const themeToggle = document.getElementById("flexSwitchCheckDefault");
    
    const switchElement = document.getElementById("flexSwitchCheckDefault"); //flexSwitchCheckChecked
    // Set the checked attribute based on the user's preference (true for dark mode, false for light mode)
    switchElement.checked = prefersDarkScheme.matches;

    const root = document.documentElement;
  
    console.log(prefersDarkScheme)
    console.log(prefersDarkScheme.matches)
    // Initialize the theme based on the user's OS-level preference
    if (prefersDarkScheme.matches) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  
    // Listen for changes in the checkbox state
    themeToggle.addEventListener("change", function () {
      console.log('toggle')
      console.log(themeToggle.checked)
      if (themeToggle.checked) {
        root.style.setProperty("--text-color", "#eee");
        root.style.setProperty("--background-color", "#121212");
        document.body.classList.add("dark-theme");
      } else {
        root.style.setProperty("--text-color", "#222");
        root.style.setProperty("--background-color", "#fff");
        document.body.classList.remove("dark-theme");
      }
    });
  }

const showAccount = document.querySelector('.showAccount');

function setupMetaMask(){
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.addEventListener('click', () => {
    getAccount();
  });
}

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
    // showAccount.innerHTML = account;
    
    
    const ethereumButton = document.querySelector('.enableEthereumButton');

    
    ethereumButton.innerHTML = account.slice(0,7) + "..." + account.slice(-5)
    ethereumButton.disabled = true

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    window.ethereum.on('chainChanged', handleChainChanged);
    function handleChainChanged(chainId) {
    // We recommend reloading the page, unless you must do otherwise.
    window.location.reload();
    }
    showAccount.innerHTML = "Chain: " + chainId;

    console.log(account)
    console.log(chainId)
}


  
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      // Call the setupThemeToggle function after the navbar is created
      setupThemeToggle();
      setupMetaMask();
    });
  

