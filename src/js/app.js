App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    // below line is required to approve the metamask application explicitly
    ethereum.enable();

    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);

    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON("Auction.json", (auction) => {
      App.contracts.Auction = TruffleContract(auction);
      App.contracts.Auction.setProvider(App.web3Provider);

      // App.listenEvent();

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
      if(err === null) {
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
    var bidAmount = $('#bidInput').val();
  
    App.contracts.Auction.deployed().then((instance) =>{
      console.log("APP-ACCOUNT", itemId,  bidAmount, App.account)
      return instance.bid(itemId, bidAmount, {from :App.coount});

    }).then((result) => {
      // console.log("RESULT", result)
      $("#content").hide();
      $("#loader").show();
    }).catch((error) => {
      console.log(error);
    })
  },

  listenEvent: function() {
    console.log("LISTEN-EVENT", event)
    App.contracts.Auction.deployed((instance) => {
      console.log("CALL-EVENT", event)
      instance.bidEvent({}, {
        fromBlock: 0,

        toBlock: 'latest'
      }).watch((error, event) => {
        console.log("EVENT-TRIGGERED", event)
        App.render();
      })

    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
