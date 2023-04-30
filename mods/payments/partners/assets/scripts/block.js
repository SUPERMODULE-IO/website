import { nftcontract, NFTABI, PAY_V1_ABI, PAY_V1_BYTECODE, DEPLOYABI } from './config.js';
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js";
//https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js
//https://cdn.ethers.io/lib/ethers-5.2.esm.min.js




const loginButton = document.getElementById("loginButton");
const deployButton = document.getElementById("deployButton");
const transactionsMenu = document.getElementById("transactionsMenu");
const withdrawMenu = document.getElementById("withdrawMenu");
const terms = document.getElementById("termsCheck");
const walletID = document.getElementById("walletID");
const reloadButton = document.getElementById("reloadButton");
const installAlert = document.getElementById("installAlert");
const mobileDeviceWarning = document.getElementById("mobileDeviceWarning");
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

//Google Script SM_UAPP_PRODUCTS
const scriptURL = 'https://script.google.com/macros/s/AKfycbzKRh9JkE-KEFEHJx-ubNr5J5eeqKt_0MTEVFfqKWUtj-dYkFoM0LOjE2psJiKt44iQ/exec';

transactionsMenu.addEventListener("click", function () {
  var dcontract = window.localStorage.getItem("dcontract");
  transactionsMenu.href = 'https://polygonscan.com/address/' + dcontract + '#tokentxns';

});

withdrawMenu.addEventListener("click", function () {
  var dcontract = window.localStorage.getItem("dcontract");
  withdrawNow(dcontract);
});

terms.addEventListener("change", function () {
  if (this.checked) {
    deployButton.disabled = false;
  } else {
    deployButton.disabled = true;
  }

});

/*
const startLoading = () => {
  connectButton.classList.add("loadingButton");
};

const stopLoading = () => {
  const timeout = setTimeout(() => {
    connectButton.classList.remove("loadingButton");
    clearTimeout(timeout);
  }, 300);
};

const isMobile = () => {
  let check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

connectButton.addEventListener("click", () => {
  if (typeof window.ethereum !== "undefined") {
    startLoading();

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];

        walletID.innerHTML = `Wallet connected: <span>${account}</span>`;

        stopLoading();
      })
      .catch((error) => {
        console.log(error, error.code);

        alert(error.code);
        stopLoading();
      });
  } else {
    if (isMobile()) {
      mobileDeviceWarning.classList.add("show");
    } else {
      window.open("https://metamask.io/download/", "_blank");
      installAlert.classList.add("show");
    }
  }
});

reloadButton.addEventListener("click", () => {
  window.location.reload();
});
*/

window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
  //alert("AccountChanged" + accounts);
})

window.ethereum.on('chainChanged', function (networkId) {
  // Time to reload your interface with the new networkId
  // alert("NetworkChanged" + networkId);
})

loginButton.addEventListener("click", async () => {


  if (typeof window.ethereum !== "undefined") {
    loginButton.disabled = true;
    loginButton.innerHTML = `Authenticating...`;
    loginButton.classList.add('animate-pulse');
    /*
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    */
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page

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

    const provider = await new ethers.BrowserProvider(window.ethereum)


    // const code = provider.getCode()
    //  console.log("CODE::"+code);
    const signer = await provider.getSigner()

    const network = await signer.provider.getNetwork()
    console.log("chaid" + network.chainId);
    console.log("chaid" + network.name);

    if (network.chainId != 137 && network.name != "matic") {
      alert("Wrong network! Switch to Matic.");
      loginButton.disabled = false;
      loginButton.innerHTML = `NFT LOG IN`;
      loginButton.classList.remove('animate-pulse');
      return;
    }

    //alert(network.name);

    const addressraw = signer.getAddress()
    const wallet = (await addressraw).valueOf()

    // alert("ABI"+NFTABI());
    // console.log("ABI"+NFTABI())
    let contract = new ethers.Contract(nftcontract(), NFTABI(), signer);
    //alert("clickedc"+contract);
    let ids = 0;
    try {
      ids = await contract.balanceOf(wallet, 0);
    } catch (error) {
      console.log('ERROR::' + error);
    }

    if (ids >= 1) {
      //alert('success');
      //alert("Saving" + wallet);
      window.localStorage.setItem("authorisedWalletAddress", wallet);
      //load admin modules
      loadAdminSection(wallet);

    }
    else {
      alert('Not Authorised: Your wallet does not contain the necessary NFT');
      loginButton.disabled = false;
      loginButton.innerHTML = `NFT LOG IN`;
      loginButton.classList.remove('animate-pulse');
    }
  } else {
    alert("No wallet detected!");
    loginButton.disabled = false;
    loginButton.innerHTML = `NFT LOG IN`;
    loginButton.classList.remove('animate-pulse');
  }



});


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

deployButton.addEventListener("click", async () => {
  deployButton.disabled = true;
  deployButton.innerHTML = `Deploying...`;
  deployButton.classList.add('animate-pulse');
  deployContract();

});

const deployContract = async () => {

  await switchToMatic();

  const provider = await new ethers.BrowserProvider(window.ethereum)

  const signer = await provider.getSigner()
  const addressraw = await signer.getAddress()

  const wallet = (await addressraw).valueOf()

  let productContract = await new ethers.ContractFactory(PAY_V1_ABI(), PAY_V1_BYTECODE(), signer);

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


async function persistContractDetails(contractAddress, walletAddress) {


  let email = document.getElementById('email').value;
  let bname = document.getElementById('bname').value;

  let success = false;

  let txn = await fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=' + email + '&wallet=' + walletAddress + '&udcontract=' + contractAddress + '&bname=' + bname
  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', (data.result == 'error') ? success = false : success = true), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))
  console.log('TXN:' + txn);

  if (success) {
    showAdminSection(walletAddress);
  } else {
    deployButton.disabled = false;
    deployButton.innerHTML = `Deploy`;
    deployButton.classList.remove('animate-pulse');
  }
}

async function getUser(wallet) {
  let noUser = false;
  let responseData = '';
  let urlWithParams = scriptURL + '?wallet=' + wallet + '&gprofile=true';
  //get Users
  await fetch(urlWithParams, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  })
    .then(response => response.json()
      .then(data => ({
        data: console.log('RDATA', ('error' == data.result) ?
          console.log('ERROR::' + data.message,
            ('no user found' == data.message) ? noUser = true : noUser = false) :
          (responseData = data)), status: response.status
      })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  if (noUser) {
    return null;
  } else {
    return responseData;
  }

}

async function loadAdminSection(wallet) {
  //First time user show deployment section
  var user = await getUser(wallet);



  if (user == null) {
    showDeploymentSection();
  } else {
    //user.user.email
    //alert("EMAIL:" + user.user.email);
    window.localStorage.setItem("email", user.user.email);
    window.localStorage.setItem("dcontract", user.user.u_dcontract);
    window.localStorage.setItem("wallet", user.user.u_wallet);
    window.localStorage.setItem("bname", user.user.b_name);
    showAdminSection(wallet);
  }
}

function showDeploymentSection() {
  document.getElementById("loginSection").classList.add('hidden');
  document.getElementById("deploymentSection").classList.remove('hidden');


}
/*
const productLoadButton = document.getElementById("productLoadButton");

productLoadButton.addEventListener("click", async () => {



  document.getElementById("deploymentSection").classList.remove('hidden');

  switchToMatic();

  const provider = new ethers.BrowserProvider(window.ethereum)

  const signer = await provider.getSigner()
  const addressraw = signer.getAddress()
  const wallet = (await addressraw).valueOf()

   showAdminSection(wallet);

});
*/

async function getAllProducts(wallet) {
  let responseData = "";
  let noproducts = false;
  let urlWithParams = scriptURL + '?wallet=' + wallet + '&gall=true';
  //get Products
  await fetch(urlWithParams, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', ('error' == data.result) ? console.log('ERROR::' + data.message, ('no products' == data.message) ? noproducts = true : noproducts = false) : (responseData = data)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  return responseData;
}

async function showAdminSection(wallet) {

  document.getElementById("loginSection").classList.add('hidden');
  document.getElementById("adminSection").classList.remove('hidden');
  document.getElementById("headerSection").classList.remove('hidden');
  document.getElementById("footerSection").classList.remove('hidden'); 6


  let responseData = "";
  let noproducts = false;
  let urlWithParams = scriptURL + '?wallet=' + wallet + '&gall=true';
  //get Products
  await fetch(urlWithParams, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', ('error' == data.result) ? console.log('ERROR::' + data.message, ('no products' == data.message) ? noproducts = true : noproducts = false) : (responseData = data)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  //First time user, no products create empty row
  if (noproducts) {
    addNewRow(wallet, 1);
    return;
  }

  const productTable = document.getElementById("productTable");

  for (let i = 0; i < responseData.products.length; i++) {

    const row = document.createElement('tr');
    row.className = "border-b dark:border-neutral-500";
    row.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${responseData.products[i].p_id}</td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="text" id="pname${responseData.products[i].p_id}" name="pname${responseData.products[i].p_id}" value="${responseData.products[i].p_name}"
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="number" id="price${responseData.products[i].p_id}" name="price${responseData.products[i].p_id}" value="${responseData.products[i].p_price}"
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><textarea id="desc${responseData.products[i].p_id}" name="desc${responseData.products[i].p_id}"
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">${responseData.products[i].p_desc}</textarea>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><button class="disabled:opacity-25 bg-blue-500 hover:bg-primary2 text-white font-bold py-2 px-4 rounded inline-flex items-center" id="save${responseData.products[i].p_id}" onclick="saveProduct('${wallet}',${responseData.products[i].p_id});" >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                      </svg>
                      <span>Save</span>
                    </button> 
                    </td>
                    `;


    productTable.appendChild(row);

  }
  addNewRow(wallet, responseData.products.length + 1);




}

export const saveProduct = async (wallet, pid) => {


  const name = document.getElementById("pname" + pid).value;
  const price = document.getElementById("price" + pid).value;
  const desc = document.getElementById("desc" + pid).value;

  document.getElementById("save" + pid).disabled = true;
  document.getElementById("save" + pid).innerHTML = `Saving...`;
  document.getElementById("save" + pid).classList.add('animate-pulse');


  await fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'pname=' + name + '&price=' + price + '&pdesc=' + desc + '&wallet=' + wallet + '&pid=' + pid + '&update=true'
  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', (data.result == 'error') ? alert('ERROR::' + data.error) : console.log('SUCCESS::' + data.result)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  //check if next row exists
  const nextid = parseInt(pid) + 1;
  const nextrow = document.getElementById("pname" + nextid);
  if (nextrow == null) {
    addNewRow(wallet, nextid);
  }
  //Button reset
  document.getElementById("save" + pid).disabled = false;
  document.getElementById("save" + pid).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6 mr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
</svg> <span>Save</span>`;
  document.getElementById("save" + pid).classList.remove('animate-pulse');
}

function editProduct() {
  alert("edit");
}

function deleteProduct() {

}

function addNewRow(wallet, pid) {
  const row = document.createElement('tr');
  row.className = "border-b dark:border-neutral-500 ";
  row.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${pid}</td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="text" id="pname${pid}" name="pname${pid}" 
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="number" id="price${pid}" name="price${pid}" 
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><textarea id="desc${pid}" name="desc${pid}"
                        class="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-blue-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <button class="disabled:opacity-25 bg-blue-500 hover:bg-primary2 text-white font-bold py-2 px-4 rounded inline-flex items-center" id="save${pid}" onclick="saveProduct('${wallet}',${pid});" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6 mr-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                      
                      <span>Save</span>
                      </button> 
                    </td>
                    `;


  productTable.appendChild(row);
}

export async function withdrawNow(dcontract) {

  if(!confirm('Are you sure that you have enough balance in your contract to initiate withdrawal ?')) {
    return;
  }

  const provider = await new ethers.BrowserProvider(window.ethereum)

  const signer = await provider.getSigner()
  const addressraw = await signer.getAddress()
  const wallet = (await addressraw).valueOf()

  // const USDCMaticTokenContract = new ethers.Contract('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', USDCABI, signer);
  // Use the approve function to send USDC to the contract
  // const usdcTxn = await USDCMaticTokenContract.approve('0x492c9690e6EE58eE81c31961553c44f8B87d31Aa',ethers.utils.parseUnits("0.001", 6));

  // Wait for the transaction to be mined
  // await usdcTxn.wait();

  // usdc polygon dcontract 0x7370E056Aed244a0211D860dc66A14EeD3aeD223
  const DeployedContract = await new ethers.Contract(dcontract, PAY_V1_ABI(), signer);

  //Settle from USDC
  const txn = await DeployedContract.settleFunds('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', {
    gasLimit: 3000000
  }).then((transferResult) => {
    console.dir(transferResult)
    alert("Withdraw Initiated")
  })
  console.log("TXN::" + tx);

}