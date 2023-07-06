let walletStat = document.getElementById("connectWallet");
let walletAdd = document.getElementById("connectedWallet");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    walletStat.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    walletAdd.removeAttribute("hidden");
    walletStat.setAttribute("hidden", "hidden");
    walletAdd.value = accounts;
    document.getElementById("onlinetokenbtn").removeAttribute("hidden");
    getBlc();
  } else {
    walletStat.innerHTML =
    "Please install MetaMask or Use Metamask App 'Browser Mode' and Login with email if use mobile Browser";

    eMailBind();
  }
}

function eMailBind()
{
  document.getElementById("emailbind").removeAttribute("hidden");
}

async function switchNet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            chainName: "BSC Mainnet",
            nativeCurrency: {
                name: "BINANCE",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com/"]
        }]
      });
    }
    catch (error) {
      walletStat.innerHTML =
        "Wrong Network";
    }
          
    getBlc();

  } else {
    walletStat.innerHTML =
    "Please install MetaMask or if you in Mobile Browser, Use Metamask App 'Browser Mode' and Login with email";
  }
}

async function addOnline() {
  if (typeof window.ethereum !== "undefined") {
    const tokenSymbol = "ONLINE";
    const tokenDecimals = 18;
    const tokenImage = "assets/img/logo_mini.png";
    const contractAddress = "0xe9ED9F1ddE9C831937969F18AB047393a53B07DA";
    try {
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: contractAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });
      
        if (wasAdded) {
          getBlc();
        } else {
          walletStat.innerHTML =
              "Refresh Your Page!";
        }
      } catch (error) {
        walletStat.innerHTML =
          "Please add ONLINE";
      }
  } else {
    walletStat.innerHTML =
      "Please install MetaMask or if you in Mobile Browser, Use Metamask App 'Browser Mode' and Login with email";
  }
}

async function getBlc() {
  const tokenABI = 
  [
    {
      "inputs":[{"internalType":"address","name":"account","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
      "stateMutability":"view",
      "type":"function"
    }
  ];
  const contractAddress = "0xe9ED9F1ddE9C831937969F18AB047393a53B07DA";
  await window.ethereum.request({method: 'eth_requestAccounts'});
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const chainId = await provider.getNetwork();
  if(chainId.name != "bnb")
  {
    switchNet();
  }
  else
  {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, tokenABI, signer);
    balance = await contract.balanceOf(walletAdd.value);
  
    document.getElementById("wltBlc").innerHTML = Math.round(balance).toLocaleString(undefined, {minimumFractionDigits: 2});
  }
}