(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[417],{7532:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create",function(){return n(57021)}])},57021:function(t,e,n){"use strict";n.r(e);var r=n(47568),i=n(70603),s=n(70655),a=n(85893),o=n(32396),u=n(57568),c=n(11163),l=n(214),d=n.n(l);e.default=function(){var t=(0,c.useRouter)(),e=(0,o.DU)(),n=(0,i.Z)((0,o.LN)(),2)[1],l=(0,o.I2)("0x71EE5708D7f1D9D84cE72BFCB2e4220A1Ed3D800");function p(){return(p=(0,r.Z)((function(r){var i,a,o,u,c,l,d;return(0,s.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,5,,6]),e?(n&&n(4),[2]):(r.preventDefault(),i=void 0,a=r.target.elements,o=a.listingType,u=a.contractAddress,c=a.tokenId,l=a.price,"directListing"!==o.value?[3,2]:[4,h(u.value,c.value,l.value)]);case 1:i=s.sent(),s.label=2;case 2:return"auctionListing"!==o.value?[3,4]:[4,f(u.value,c.value,l.value)];case 3:i=s.sent(),s.label=4;case 4:return i&&t.push("/"),[3,6];case 5:return d=s.sent(),console.error(d),[3,6];case 6:return[2]}}))}))).apply(this,arguments)}function f(t,e,n){return y.apply(this,arguments)}function y(){return(y=(0,r.Z)((function(t,e,n){var r;return(0,s.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,null===l||void 0===l?void 0:l.auction.createListing({assetContractAddress:t,buyoutPricePerToken:n,currencyContractAddress:u.K8$,listingDurationInSeconds:604800,quantity:1,reservePricePerToken:0,startTimestamp:new Date,tokenId:e})];case 1:return[2,i.sent()];case 2:return r=i.sent(),console.error(r),[3,3];case 3:return[2]}}))}))).apply(this,arguments)}function h(t,e,n){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)((function(t,e,n){var r;return(0,s.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,null===l||void 0===l?void 0:l.direct.createListing({assetContractAddress:t,buyoutPricePerToken:n,currencyContractAddress:u.K8$,listingDurationInSeconds:604800,quantity:1,startTimestamp:new Date(0),tokenId:e})];case 1:return[2,i.sent()];case 2:return r=i.sent(),console.error(r),[3,3];case 3:return[2]}}))}))).apply(this,arguments)}return(0,a.jsx)("form",{onSubmit:function(t){return function(t){return p.apply(this,arguments)}(t)},children:(0,a.jsx)("div",{className:d().container,children:(0,a.jsxs)("div",{className:d().collectionContainer,children:[(0,a.jsx)("h1",{className:d().ourCollection,children:"Upload your NFT to the marketplace:"}),(0,a.jsxs)("div",{className:d().listingTypeContainer,children:[(0,a.jsx)("input",{type:"radio",name:"listingType",id:"directListing",value:"directListing",defaultChecked:!0,className:d().listingType}),(0,a.jsx)("label",{htmlFor:"directListing",className:d().listingTypeLabel,children:"Direct Listing"}),(0,a.jsx)("input",{type:"radio",name:"listingType",id:"auctionListing",value:"auctionListing",className:d().listingType}),(0,a.jsx)("label",{htmlFor:"auctionListing",className:d().listingTypeLabel,children:"Auction Listing"})]}),(0,a.jsx)("input",{type:"text",name:"contractAddress",className:d().textInput,placeholder:"NFT Contract Address"}),(0,a.jsx)("input",{type:"text",name:"tokenId",className:d().textInput,placeholder:"NFT Token ID"}),(0,a.jsx)("input",{type:"text",name:"price",className:d().textInput,placeholder:"Sale Price"}),(0,a.jsx)("button",{type:"submit",className:d().mainButton,style:{marginTop:32,borderStyle:"none"},children:"List NFT"})]})})})}},11163:function(t,e,n){t.exports=n(90387)},47568:function(t,e,n){"use strict";function r(t,e,n,r,i,s,a){try{var o=t[s](a),u=o.value}catch(c){return void n(c)}o.done?e(u):Promise.resolve(u).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,s){var a=t.apply(e,n);function o(t){r(a,i,s,o,u,"next",t)}function u(t){r(a,i,s,o,u,"throw",t)}o(void 0)}))}}n.d(e,{Z:function(){return i}})},70603:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.d(e,{Z:function(){return i}})}},function(t){t.O(0,[774,888,179],(function(){return e=7532,t(t.s=e);var e}));var e=t.O();_N_E=e}]);