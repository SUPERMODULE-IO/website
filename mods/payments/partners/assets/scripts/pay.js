import { PAY_V1_ABI, PAY_V1_BYTECODE,USDCABI } from './config.js';
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js";
//https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js
//https://cdn.ethers.io/lib/ethers-5.2.esm.min.js




const loginButton = document.getElementById("loginButton");
const deployButton = document.getElementById("deployButton");
const walletID = document.getElementById("walletID");
const reloadButton = document.getElementById("reloadButton");
const installAlert = document.getElementById("installAlert");
const mobileDeviceWarning = document.getElementById("mobileDeviceWarning");
const loadButton = document.getElementById("loadButton");

//Google Script SM_UAPP_PRODUCTS
const scriptURL = 'https://script.google.com/macros/s/AKfycbxiAVa5fEqWlC5tguOrXOj0rvf13_0Zl4NlXJo3rC_li1R8w9j7MfrvIksV4sPZZdSj/exec';



window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
//  alert("AccountChanged" + accounts);
})

window.ethereum.on('networkChanged', function (networkId) {
  // Time to reload your interface with the new networkId
 // alert("NetworkChanged" + networkId);
})




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


const deployContract = async () => {

  switchToMatic();

  const provider = new ethers.BrowserProvider(window.ethereum)

  const signer = provider.getSigner()
  const addressraw = signer.getAddress()

  const addressstr = (await addressraw).valueOf()


  let productContract = new ethers.ContractFactory(PAY_V1_ABI, PAY_V1_BYTECODE, signer);

  //const contract = await productContract.deploy();

  //console.log(contract.address);
  //console.log(contract.deployTransaction);
  //console.log(contract.interface);

  //const FormatTypes = ethers.utils.FormatTypes;
  //console.log(contract.interface.format(FormatTypes.full));

  //Ussing async-await for deploy method
  persistContractDetails('contract.address', addressstr);

}


async function persistContractDetails(contractAddress, walletAddress) {
  // If your contract requires constructor args, you can specify them here

  let email = document.getElementById('email').value;

  //https://script.google.com/macros/s/AKfycbyb5cuAQvAKzAki1kYWOIXT1ipB-pCTxjtRFSc8pxPxCOxtyAHnN0LdPA-TKi5K6mSU/exec?wallet=0xCbAEa9c7356a631e92f78d0bfF62a4511d3229c9&udcontract=0x7370E056Aed244a0211D860dc66A14EeD3aeD223&email=vyvakz@dsa.com
  //https://script.google.com/macros/s/AKfycbyv3LXeTkGQZFoi5hpwek9WbsddpD2_iPPRtn_xkEhv_Xg4XX8HAutsZW1bQwSdtDjM/exec
  //https://script.google.com/macros/s/AKfycbxwgA1_YWDFtJmRWWK7A3REo4haE1e66OgiudBfDK_BNdHK5E9Kg8G3SK5wO0xigQdC/exec
  //https://script.google.com/macros/s/AKfycbzKR-_myPjtLiIiFlaBSSKuqHzidvDSXVnjyqwj9tHpmdfIZad0dfsgWXqBu0qs58nJ/exec
  //https://script.google.com/macros/s/AKfycbyX59hoOeVfhWaVGBqQR9TcliG9l3x5o1WBkPjL-P5KdsmC0nW105dhPW61Lpbw7Dfj/exec
  //https://script.google.com/macros/s/AKfycbwPaHgMN14mkittbqySbp_5qZtafGhtKa8Lkl7FdsZnCqeC9r96qajKErFABuMq3KhN/exec

  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=' + email + '&wallet=' + walletAddress + '&udcontract=' + contractAddress
  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', (data.result == 'error') ? alert('ERROR::' + data.error) : alert('SUCCESS::' + data.result)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

}

function isUserExist(email, bname, wallet) {
  let exists = false;
  fetch(scriptURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=' + email + '&wallet=' + wallet + '&bname=' + bname
  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', (data.result == 'error' && data.message == 'user not registered') ? console.log(exists) : console.log(exists = true)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  return exists;

}

function loadAdminSection(email, bname, wallet) {
  //First time user show deployment section
  if (!isUserExist(email, bname, wallet)) {
    showDeploymentSection();
  } else {
    showAdminSection();
  }
}

function showDeploymentSection() {

}

const productLoadButton = document.getElementById("productLoadButton");



async function showAdminSection(wallet) {

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
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="text" id="price${responseData.products[i].p_id}" name="price${responseData.products[i].p_id}" value="${responseData.products[i].p_price}"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><textarea id="desc${responseData.products[i].p_id}" name="desc${responseData.products[i].p_id}"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">${responseData.products[i].p_desc}</textarea>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" id="save${responseData.products[i].p_id}" onclick="saveProduct('${wallet}',${responseData.products[i].p_id});" >
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

export const saveProduct = (wallet, pid) => {


  const name = document.getElementById("pname" + pid).value;
  const price = document.getElementById("price" + pid).value;
  const desc = document.getElementById("desc" + pid).value;

  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'pname=' + name + '&price=' + price + '&pdesc=' + desc + '&wallet=' + wallet + '&pid=' + pid + '&update=true'
  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', (data.result == 'error') ? alert('ERROR::' + data.error) : alert('SUCCESS::' + data.result)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  //check if next row exists
  const nextid = parseInt(pid) + 1;
  const nextrow = document.getElementById("pname" + nextid);
  if (nextrow == null) {
    addNewRow(wallet, nextid);
  }
}

function editProduct() {
  alert("edit");
}

function deleteProduct() {

}

function addNewRow(wallet, pid) {
  const row = document.createElement('tr');
  row.className = "border-b dark:border-neutral-500";
  row.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${pid}</td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="text" id="pname${pid}" name="pname${pid}" 
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"> <input type="text" id="price${pid}" name="price${pid}" 
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        required>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><textarea id="desc${pid}" name="desc${pid}"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" id="save${pid}" onclick="saveProduct('${wallet}',${pid});" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6 mr-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                      
                      <span>Save</span>
                      </button> 
                    </td>
                    `;


  productTable.appendChild(row);
}


//START

export const getProducts = async () => {

  loadButton.disabled = true;
  loadButton.innerHTML = `Loading...🚀`;
  loadButton.classList.add('animate-pulse');

  let urlWithParams = scriptURL + '?catalog=true';
  var noproducts = false;
  var responseData;
  //get Products
  await fetch(urlWithParams, {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

  })
    .then(response => response.json()
      .then(data => ({ data: console.log('RDATA', ('error' == data.result) ? console.log('ERROR::' + data.message, ('no products' == data.message) ? noproducts = true : noproducts = false) : (responseData = data)), status: response.status })))
    .catch(error => console.error('NetworkError:', alert('NETWORK ERROR::' + error)))

  //alert(responseData.products);

  var content = document.getElementById('contentDiv');
  for (let i = 0; i < responseData.products.length; i++) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    var price = formatter.format(responseData.products[i].p_price);
    var service = document.createElement('div');
    service.className = "p-4 xl:w-1/4 md:w-1/2 w-full";
    service.innerHTML = ` 
  <div
    class="h-full p-6 rounded-lg border-2 bg-white shadow-md shadow-black border-primary2 flex flex-col relative overflow-hidden">
    <span class="bg-primary2 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">${responseData.products[i].business_name}</span>

    <h2 class="text-sm tracking-widest title-font mb-1 font-medium">${responseData.products[i].p_name}</h2>
    <h1
      class="text-1xl font-semibold text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
      <span>${price} USDC</span>
      

    </h1>

    <p class="flex items-center text-gray-600 mb-2 text-sm">
      <span
        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-primary2 text-white rounded-full flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          class="w-3 h-3" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>${responseData.products[i].p_desc}
    </p>


    <button id="pay${responseData.products[i].p_id}"
      class="shadow-md shadow-black flex items-center mt-auto text-white bg-blue-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary2 disabled:opacity-25 rounded"
      onclick="payNow('${responseData.products[i].p_price}','${responseData.products[i].d_contract}',${responseData.products[i].p_id});">Pay & Book Service
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    <br>
    <button id="pay${responseData.products[i].p_id}"
    class="shadow-md shadow-black flex items-center mt-auto text-white bg-blue-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary2 disabled:opacity-25 rounded"
    onclick="window.open('https://polygonscan.com/address/${responseData.products[i].d_contract}#tokentxns','_blank');">View Transactions
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
    
    <p class="text-xs text-gray-500 mt-3">For any support related to this service please reach out to <a class="text-blue-600" href="mailto:${responseData.products[i].b_email}?subject=Support Request for ${responseData.products[i].p_name}&body=Please describe your support needs.">${responseData.products[i].b_email}</a></p>
  </div>

  
  `;
  content.appendChild(service);

  }
  loadButton.classList.add('hidden');

}


export async function payNow(amount,dcontract,pid) {

  document.getElementById('pay'+pid).disabled = true;
  document.getElementById('pay'+pid).innerHTML = `Processing...`;
  document.getElementById('pay' + pid).classList.add('animate-pulse');
  
  //contract 
  //0xa50a2617A9eD30A15b401aa5de58D725220946C4
  //0x495c7F8a6f62F27491a9F1DDb90dAdcA0167f052

  const provider = await new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()


  // usdc polygon
  const USDCMaticTokenContract = await new ethers.Contract('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', USDCABI(), signer);

 // let AMOUNT = integer.parseInt(amount);
  // USDT parameters
  //const erc20Token = new web3.eth.Contract(USDT_ABI, 0xc2132D05D31c914a87C6611C10748AEb04B58e8F)

  // Contract that will receive USDT
  //const recipient = new web3.eth.Contract(DEPLOYABI, 0x495c7F8a6f62F27491a9F1DDb90dAdcA0167f052);
  //const recipient = new ethers.Contract(0x492c9690e6EE58eE81c31961553c44f8B87d31Aa, DEPLOYABI, signer);

  //tokenContract.approve(<Your_Contract_Address>, amount, {gasLimit: gasLimit})
  // Require user approval
  //await erc20Token.approve(AMOUNT, 0x495c7F8a6f62F27491a9F1DDb90dAdcA0167f052).send({from: addressraw})

  //await erc20Token.approve(0x495c7F8a6f62F27491a9F1DDb90dAdcA0167f052, AMOUNT,{gasLimit: 3000000} )

  // USDC approval

  /*
  try {
     const tx = await erc20Token.approve(0x492c9690e6EE58eE81c31961553c44f8B87d31Aa, AMOUNT );
    
  } catch (error) {
    console.log(error);
    return false;
  }
  const result = await tx.wait();
  console.log(result.status);
  */

  // Call function on recipient to retrieve USDT
  //await recipient.deposit(AMOUNT).send({from: addressraw})

  // Use the approve function to send USDC to the contract
  //const usdcTxn = await USDCMaticTokenContract.approve('0x492c9690e6EE58eE81c31961553c44f8B87d31Aa',ethers.utils.parseUnits("0.001", 6));

  // Wait for the transaction to be mined
  //await usdcTxn.wait();

  // How many tokens?
  let numberOfTokens = await new ethers.parseUnits(amount, 6);
  console.log(`numberOfTokens: ${numberOfTokens}`);

 // const usdcTxn = await USDCMaticTokenContract.approve(dcontract,ethers.parseUnits(amount, 6));

  // Wait for the transaction to be mined
 // await usdcTxn.wait();

  // Send USDC to contract

  //First Test Deployed Contract : 0x492c9690e6EE58eE81c31961553c44f8B87d31Aa some balance remaining
  //Seond settlement function added 0xAB7d017735E6a5886258fBA54Bc75C2353c21717
  //Third add balance function and settlement : 0x7370E056Aed244a0211D860dc66A14EeD3aeD223

  const txn = await USDCMaticTokenContract.transfer(dcontract, ethers.parseUnits(amount, 6)).then((transferResult) => {
    console.dir("RESULT::"+transferResult)
    alert("Payment Initiated");
  })
  console.log("TX::"+txn);
  document.getElementById('pay'+pid).disabled = false;
  document.getElementById('pay'+pid).innerHTML = `Pay & Book Service`;
  // Code for sending ETHER(base token) to contract 

  /*
  let tx = {
    to: '0x492c9690e6EE58eE81c31961553c44f8B87d31Aa',
    value: numberOfTokens
  };

  const transaction = await signer.sendTransaction(tx);
  console.dir(transaction);
  alert("sent token");
  */
}