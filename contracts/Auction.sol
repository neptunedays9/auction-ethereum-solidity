pragma solidity >=0.4.21 <0.7.0;

contract Auction {

    struct Item {
        uint id;
        string name;
        uint maxBidAmount;
        uint maxBidPartyId;
    }

    mapping(uint => Item) public items;

    uint public itemsCount;

    function addItem (string memory _name) private {
        itemsCount++;
        items[itemsCount] = Item(itemsCount, _name, 0, 0);
    }

    constructor() public {
        addItem('Pembroke 38, Epping 2121');
    }
}