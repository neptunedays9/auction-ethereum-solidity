App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    // below line is required to approve the metamask application explicitly
    await ethereum.enable();

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if(typeof web3 !== undefined) {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);

    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    console.log("web3", web3)
    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON("Auction.json", (auction) => {
      console.log("web3-1", web3)
      App.contracts.Auction = TruffleContract(auction);
      App.contracts.Auction.setProvider(App.web3Provider);

      return App.render();
    });

    // return App.bindEvents();
  },

  render: function() {
    var auctionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getAccounts((err, account) => {
      console.log(account, err)
      if(err === null) {
        // console.log(account)
        App.account = account;
        $("#accountAddress").html("Your account" + account);
      }
    });

    App.contracts.Auction.deployed().then((instance) => {
      auctionInstance = instance;
      return auctionInstance.itemsCount();
    }).then((itemsCount) => {

      var auctionResults = $("#auctionResults");
      auctionResults.empty();

      for (var i = 1; i <= itemsCount; i++) {

        auctionInstance.items(i).then( (item) => {
          // console.log(item[1])
          var id = item[0];
          var name = item[1];
          var bidAmount = item[2];

          var auctionTemplate = "<tr><th>" + id + "</th><td>" + name + "</th><td>" + bidAmount + "</td></tr>";
          auctionResults.append(auctionTemplate);

        });
      }

      loader.hide();
      content.show();
      // return auctionInstance.items(App.account);
    }).catch((error) => {
      console.warn(error)
    });
  },

  bidAuction: function() {
    var itemId = 1; // TODO $('#itemSelect').val();
    var bidAmount = 5000; // TODO $('#bidInput').val();
  
    App.contracts.Auction.deployed().then((instance) =>{
      console.log("APP-ACCOUNT", itemId,  bidAmount, App.account)
      return instance.bid(itemId, bidAmount, {from : App.account})
    }).then((result) => {
      console.log("RESULT", result)
      $("#content").hide();
      $("#loader").show();
    }).catch((error) => {
      console.log(error);
    })
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
