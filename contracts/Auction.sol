pragma solidity >=0.4.21 <0.7.0;

contract Auction {

    struct Item {
        uint id;
        string name;
        uint maxBidAmount;
        address maxBidPartyId;
    }

    mapping(uint => Item) public items;

    uint public itemsCount;

    function addItem (string memory _name) private {
        itemsCount++;
        items[itemsCount] = Item(itemsCount, _name, 0, address(0x0));
    }

    constructor() public {
        addItem('Pembroke 38, Epping 2121');
    }

    function bid(uint _itemId, uint bidAmount) public {

        // add the check, only if the amount is more, assign it
        items[_itemId].maxBidAmount = bidAmount;
        items[_itemId].maxBidPartyId = msg.sender;

    }
}