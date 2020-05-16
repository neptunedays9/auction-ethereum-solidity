* Installation
- Install truffle(npm), Ganache, MetaMask(Chrome extention)
- Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
- truffle unbox pet-shop

* To get the app instance
- truffle migrate
- truffle console
- Auction.deployed().then((instance) => { app = instance})
- web3.eth.getAccounts().then((i) => i)
- app.address
- truffle test

Reference :
- dApp university
- ethereum.enable() to be added in app.js as metamask user should explicitly allow the application to access to the accounts