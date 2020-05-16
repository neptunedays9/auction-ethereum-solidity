var Auction = artifacts.require('./Auction.sol')

contract("Auction", (accounts) => {
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
});