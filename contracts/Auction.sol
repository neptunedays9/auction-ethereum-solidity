pragma solidity >=0.4.21 <0.7.0;

contract Auction {
    uint public itemsCount;
    mapping(uint => Item) public items;

    constructor() public {
        addItem('Pembroke 38, Epping 2121');
    }
 
    struct Item {
        uint id;
        string name;
        uint maxBidAmount;
        address maxBidPartyId;
    }

    function addItem (string memory _name) private {
        itemsCount++;
        items[itemsCount] = Item(itemsCount, _name, 0, address(0x0));
    }

    function bid(uint _itemId, uint bidAmount) public {

        // add the check, only if the amount is more, assign it
        require(bidAmount > items[_itemId].maxBidAmount);

        require(_itemId > 0 && _itemId <= itemsCount);

        items[_itemId].maxBidAmount = bidAmount;
        items[_itemId].maxBidPartyId = msg.sender;

        emit bidEvent(_itemId);
    }

    event bidEvent(
        uint indexed _itemId
    )
    ;
}