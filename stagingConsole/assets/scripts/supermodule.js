import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js";

const deployButton = document.getElementById("deployButton");
deployButton.addEventListener("click", async () => {
    deployButton.disabled = true;
    deployButton.innerHTML = `Deploying...`;
    deployButton.classList.add('animate-pulse');

    const contractAddress = await deployContract();
    deployButton.innerHTML = contractAddress;
    deployButton.classList.remove('animate-pulse');
  
});

const deployContract = async (network,token,version) => {

    await switchToMatic();
  
    const provider = await new ethers.BrowserProvider(window.ethereum)
  
    const signer = await provider.getSigner()
    const addressraw = await signer.getAddress()
  
    const wallet = (await addressraw).valueOf()

    //Load payment module
   // PAY_V1_ABI: await (async () => {let {PAY_V1_ABI} = await import('./pay_eth_usdc_v1.js'); return PAY_V1_ABI();})()
   // PAY_V1_BYTECODE: await (async () => {let {PAY_V1_BYTECODE} = await import('./pay_eth_usdc_v1.js'); return PAY_V1_BYTECODE();})()
    var modName = "pay_" + network + "_" + token + "_" + version + ".js"

    switch(modName)
    {
        case "pay_eth_usdc_v1.js":
            return deployModContract(signer,modeName);
        default :
            return "INVALID";
        //no module to load
    }

    const module = await import('./pay_eth_usdc_v1.js')
  
    let productContract = await new ethers.ContractFactory(module.PAY_V1_ABI(), module.PAY_V1_BYTECODE(), signer);
  
    const contract = await productContract.deploy();
    const contractAddress = await contract.getAddress();
  
    console.log("Contract::" + contractAddress);
    //console.log(contract.deployTransaction);
    //console.log(contract.interface);
  
    //const FormatTypes = ethers.utils.FormatTypes;
    //console.log(contract.interface.format(FormatTypes.full));
  
    //Ussing async-await for deploy method
    persistContractDetails(contractAddress, wallet);
  
  }

  const deployModContract = async (signer,modName) => {
    const module = await import(modName)
    let productContract = await new ethers.ContractFactory(module.ABI(), module.BYTECODE(), signer);
    const contract = await productContract.deploy();
    const contractAddress = await contract.getAddress();
    return contractAddress;
  }

  const switchToMatic = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0x89",
        rpcUrls: ["https://polygon-rpc.com/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        },
        blockExplorerUrls: ["https://explorer.matic.network"]
      }]
    });
  }