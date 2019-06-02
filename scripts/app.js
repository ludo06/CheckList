
(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedItems: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    deleteButton: document.querySelector('.delete-button'),
  };

  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.updateForecasts();
  });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new item dialog
    console.log("add button");
    app.toggleAddDialog(true);
  });

  document.getElementById('butMore').addEventListener('click', function() {
    // Open/show delete button
    console.log("aqui!!");
    app.toggleDeleteButton(true);
  });

  document.getElementById('butAddItem').addEventListener('click', function() {
    // Add the newly selected item
    var select = document.getElementById('selectItemToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    // TODO init the app.selectedItems array here
    app.getForecast(key, label);
    // TODO push the selected item to the array and save here
    app.toggleAddDialog(false);
  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    // Close the add new item dialog
    app.toggleAddDialog(false);
  });

  // Toggles the visibility of the add new item dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  app.toggleDeleteButton = function(visible) {
    if (visible) {
      app.deleteButton.classList.add('delete-button--visible');
    } else {
      app.deleteButton.classList.remove('delete-button--visible');
    }
  };
  

  app.updateForecastCard = function(data) {
    var current = data.channel.item.condition;

    var card = app.visibleCards[data.key];
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.item-name').textContent = data.label;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    }

    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }

    card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));
    var today = new Date();
    today = today.getDay();
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

  app.getForecast = function(key, label) {
    var results = {
      key: key,
      label: label,
      channel: {
        item: {
          condition: {
            text: label,
            code: parseInt(key)
        }},
    }}; 
    console.log(key);
    console.log(label);
    app.updateForecastCard(results);
  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  // TODO add saveselectedItems function here
  app.getIconClass = function(itensCode) {

    itensCode = parseInt(itensCode);
    switch (itensCode) {
      case 1:
        return 'keys';
      case 2:
        return 'car-key';
      case 3: 
        return 'headphones';
      case 4:
        return 'earphones';
      case 5: 
        return 'wallet';
      case 6: 
        return 'umbrella';
      case 7: 
        return 'watches';
      case 8: 
        return 'backpack';
      case 9:
        return 'money';
      case 10: 
        return 'laptop';
    }
  };

  var initialList = {
    key: '0005',
    label: 'Wallet',
    channel: {
      item: {
        condition: {
          text: "Wallet",
          code: 5
      }},
  }};
  // TODO uncomment line below to test app with fake data
  app.updateForecastCard(initialList);
})();
