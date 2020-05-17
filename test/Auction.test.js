var Auction = artifacts.require('./Auction.sol')

contract("Auction", (accounts) => {
    var auctionInstance;

    it("Initializes with an item", () => {
        return Auction.deployed().then((instance) => {
            return instance.itemsCount();
        }).then((count) => assert.equal(1, count))
    }) ;

    it("should not initialise with more than one item", () => {
        return Auction.deployed().then((instance) => {
            return instance.itemsCount();
        }).then((count) => expect(count).not.equal(2))
    }) ;

    it("initialised the items with the correct value", () => {
        return Auction.deployed().then((i) => {
            return i.items(1);
        }).then((item) => {
            assert.equal(item[0], 1)
            assert.equal(item[1], 'Pembroke 38, Epping 2121');
        });

    });

    it("should allow the party to bid", () => {
        var itemId;
        var bidAmount = 1000;
        return Auction.deployed().then((i) => {
            auctionInstance = i;
            itemId = 1;
        }).then(() => { 
            return web3.eth.getAccounts().then((acc) => {
                return auctionInstance.bid(itemId, bidAmount, {from : acc[0]})
            }).then((txn) => {
                 return auctionInstance.items(itemId)
            }).then((item) => {
                 assert.equal(item[2], 1000, "bidAmount is updated")
            })
        })
    });

    it("should throw exception for invalid item", () => {
        var itemId;
        var bidAmount = 1000;
        return Auction.deployed().then((i) => {
            auctionInstance = i;
            itemId = 99;
        }).then(() => { 
            return web3.eth.getAccounts().then((acc) => {
                return auctionInstance.bid(itemId, bidAmount, {from : acc[0]})
            }).catch((error) => {
                 assert(error.message.indexOf('revert') >= 0);
            })
        })
    });



    it("should not update if bidAmount is less than the previous", () => {
        var itemId;
        var bidAmount = 1000;
        var accounts;
        return Auction.deployed().then((i) => {
            auctionInstance = i;
            itemId = 1;
        }).then(() => { 
            return web3.eth.getAccounts().then((acc) => {
                accounts = acc;
                return auctionInstance.bid(itemId, bidAmount + 1, {from : accounts[0]})
            }).then((txn) => {
                return web3.eth.getAccounts().then((acc) => {
                    return auctionInstance.bid(itemId, bidAmount, {from : accounts[0]})
            }).catch((error) => {
                assert(error.message.indexOf('revert') >= 0)
            })
        })
    })
    });
});