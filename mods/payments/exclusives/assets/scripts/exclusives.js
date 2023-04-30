import { USDCABI } from './config.js';
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js";
//https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.js
//https://cdn.ethers.io/lib/ethers-5.2.esm.min.js




const loginButton = document.getElementById("loginButton");
const deployButton = document.getElementById("deployButton");
const walletID = document.getElementById("walletID");
const reloadButton = document.getElementById("reloadButton");
const installAlert = document.getElementById("installAlert");
const mobileDeviceWarning = document.getElementById("mobileDeviceWarning");

//Google Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbyqNRuln9cIEoxIOy2ROD85G9pX2qpT-auf25YwbCWVPtOe-qA-ylP_RMUbYibZlsPotg/exec';







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





//START

export const getProducts = async () => {

  document.getElementById("loadButton").innerHTML = `Loading... 🚗`;
  document.getElementById("loadButton").classList.add('animate-ping');


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
    var service = document.createElement('div');
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    var price = formatter.format(responseData.products[i].price);
    let images = responseData.products[i].images.split(",");
    var slider = `<div class="flex flex-wrap -m-4 text-center swiper ">
                   <div class="swiper-wrapper">`;
    for (let i = 0; i < images.length; i++) {
      slider += `<div class="p-4 md:w-1/4 sm:w-1/2 w-full swiper-slide">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg swiper-zoom-container ">
                    <img alt="gallery" class="w-full object-cover h-full object-center block"
                    src="./assets/images/SuperExclusives/${images[i]}.jpeg">
                  </div>
                </div>`;


    }
    slider += `</div><div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div></div>`;

    service.className = "p-4 xl:w-1/4 md:w-1/2 w-full";
    service.innerHTML = ` 
  <div
    class="h-full p-6 rounded-lg border-2 bg-white shadow-md shadow-black border-primary1 flex flex-col relative overflow-hidden">
    <span class="bg-primary1 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">${responseData.products[i].company}</span>

    <h2 class="text-sm tracking-widest title-font mb-1 font-medium">${responseData.products[i].model}</h2>
    <h1
      class="text-1xl font-semibold text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
      <span>${price} (USDC)</span>
    </h1>
    ${slider}
    <br>
  
    <p class="flex items-center text-gray-600 mb-2 text-sm">
      <span
        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-primary1 text-white rounded-full flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          class="w-3 h-3" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>Year: ${responseData.products[i].year}
    </p>
    <p class="flex items-center text-gray-600 mb-2 text-sm">
      <span
        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-primary1 text-white rounded-full flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          class="w-3 h-3" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>Specs: ${responseData.products[i].spec}
    </p>
    <p class="flex items-center text-gray-600 mb-2 text-sm">
      <span
        class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-primary1 text-white rounded-full flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          class="w-3 h-3" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>Kms: ${responseData.products[i].kms}
    </p>


    <button
      class="shadow-md shadow-black flex items-center mt-auto text-white bg-gradient-to-b from-primary1 to-primary2 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gradient-to-t rounded"
      onclick="payNow(${responseData.products[i].p_price},${responseData.products[i].d_contract});">Buy Now
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
    
    <p class="text-xs text-gray-500 mt-3">For any support related to this car please reach out to <a class="text-blue-600" href="mailto:support@iih.ae?subject=Support Request for ${responseData.products[i].model}&body=Please describe your support needs.">support@iih.ae</a></p>
  </div>

  
  `;
    content.appendChild(service);

  }

  //enable slider
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    zoom: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },


  });

  document.getElementById("loadButton").classList.add('hidden');
}


export async function payNow(amount, dcontract) {

  //contract 
  //0xa50a2617A9eD30A15b401aa5de58D725220946C4
  //0x495c7F8a6f62F27491a9F1DDb90dAdcA0167f052

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = provider.getSigner()
  const addressraw = signer.getAddress()
  const addressstr = (await addressraw).valueOf()

  // usdc polygon
  const USDCMaticTokenContract = new ethers.Contract('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', USDCABI, signer);

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
  let numberOfTokens = ethers.utils.parseUnits(amount, 6);
  console.log(`numberOfTokens: ${numberOfTokens}`);



  // Send USDC to contract

  //First Test Deployed Contract : 0x492c9690e6EE58eE81c31961553c44f8B87d31Aa some balance remaining
  //Seond settlement function added 0xAB7d017735E6a5886258fBA54Bc75C2353c21717
  //Third add balance function and settlement : 0x7370E056Aed244a0211D860dc66A14EeD3aeD223

  const txn = await USDCMaticTokenContract.transfer(dcontract, numberOfTokens).then((transferResult) => {
    console.dir("RESULT::" + transferResult)
    alert("Transfer Initiated");
  })
  console.log("TX::" + txn);
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