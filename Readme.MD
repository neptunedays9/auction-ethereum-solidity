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
- to get accounts in a list - web3.eth.getAccounts().then((acc) => accounts=acc)
- party 0 to bid - app.bid(1, 1000, {from: accounts[0]})

Reference :
- dApp university
- ethereum.enable() to be added in app.js as metamask user should explicitly allow the application to access to the accounts