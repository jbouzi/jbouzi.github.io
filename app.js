(function() {
  'use strict';

  var app = {
    isLoading: true,
    amount: {},
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
  /*
  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new purchase dialog
    app.toggleAddDialog(true);
  });
  */
  document.getElementById('butAddPurchase').addEventListener('click', function() {
    // Add the newly selected city
    var amount = document.getElementById('newPurchaseAmount').value;
    amount = +amount*-1;
    app.addAmount(amount);
    app.saveAmount(); 
    app.updateAmountCard();
    document.getElementById('newPurchaseAmount').value = '';
  });
  
  document.getElementById('butPerDay').addEventListener('click', function() {
    var perDay = document.getElementById('newPerDay').value;
    app.editPerDay(+perDay);
    app.saveAmount();
    document.getElementById('newPerDay').value = "";
    document.getElementById('newPerDay').placeholder = perDay;
  });
  

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };
  
  // Update the Amount Card
  app.updateAmountCard = function() {
    document.getElementById("amount").innerHTML = app.amount.amount + ' kr';
  };
  
//Update the perDay placeholder
  app.updatePerDay = function() {
    document.getElementById("newPerDay").placeholder = app.amount.perDay;
  };

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  // Add Purchase Amount
  app.addAmount = function(amount) {
  	app.amount.amount = +app.amount.amount + +amount;
  };
  
  app.editPerDay = function(perDay) {
  	app.amount.perDay = +perDay;
  };
  
  // Update amountDate to today
  app.updateDate = function() {
    var today = new Date();
  	app.amount.date = today;
  };

  // Save amount to localStorage.
  app.saveAmount = function() {
    var amount = JSON.stringify(app.amount);
    localStorage.amount = amount;
    console.log('Saving amount...');
    console.log(amount);
  };



  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
  app.amount = localStorage.amount;
  if (app.amount) {
    app.amount = JSON.parse(app.amount);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var firstDate = new Date();
	var secondDateTmp = app.amount.date;
	var year = +secondDateTmp.substring(0, 4);
	var month = +secondDateTmp.substring(5, 7) - 1;
	var day = +secondDateTmp.substring(8, 10);
    var secondDate = new Date(year,month,day,0,0,0);
    var diffDays = Math.floor(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    app.updateDate();
    app.addAmount(+app.amount.perDay*diffDays);
    app.saveAmount();
  } else {
    console.log('Opening for the first time');
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    var today = new Date();
    app.amount = {dailyAmount: 200, perDay: 200, amount: 200, date: today};
    app.saveAmount();
  }
  app.updateAmountCard();
  app.updatePerDay();
  
  // TODO add service worker code here
  console.log('About to start');
  if ('serviceWorker' in navigator) {
    console.log('In if...');
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
