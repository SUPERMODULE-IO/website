import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js";

export async function pay(amount, address, network, token, version) {

  var isModule = true;
  var ABI;
  var tokenDecimal = 6; // for usdc
  const spayButton = document.getElementById("spay_button");
  spayButton.disabled = true;
  spayButton.innerHTML = `Processing...`;

  var modName = "www.supermodule.com/community/assets/scripts/spay_" + network + "_" + token + "_" + version + ".js"
  const module = await import(modName);
  alert('MOD'+module);

  if (network == "eth") {
    await switchToEthereum();
  } else if (network == "matic") {
    await switchToMatic();

  } else {
    isModule = false;
  }

  if (isModule) {
    const provider = await new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const tokenContract = await new ethers.Contract(module.TOKEN_ADDRESS(), module.ABI(), signer);
    const txn = await tokenContract.transfer(address, ethers.parseUnits(amount, module.DECIMAL())
    ).then((transaction) => {
      console.dir("RESULT::" + transaction)
      alert("Payment Initiated")
      transaction.wait()
      then((receipt) => {
        alert("Payment Successful")
      }).catch(err => alert("ERROR::" + err.reason))

    }).catch(err => alert(err.reason))
    spayButton.disabled = false;
    spayButton.innerHTML = `Pay`;


  } else {
    alert("Payment Module Error");
    spayButton.disabled = false;
    spayButton.innerHTML = `Pay`;
  }



}

const switchToEthereum = async () => {

  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x1' }],
  });

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
