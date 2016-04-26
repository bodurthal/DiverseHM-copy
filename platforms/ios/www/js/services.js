angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Affinity Group #1',
    lastText: 'INFO',
    face: 'img/unknown.jpeg'
  }, {
    id: 1,
    name: 'Affinity Group #2',
    lastText: 'INFO',
    face: 'img/unknown.jpeg'
  }, {
    id: 2,
    name: 'Affinity Group #3',
    lastText: 'INFO',
    face: 'img/unknown.jpeg'
  }, {
    id: 3,
    name: 'Affinity Group #4',
    lastText: 'INFO',
    face: 'img/unknown.jpeg'
  }, {
    id: 4,
    name: 'Affinity Group #5',
    lastText: 'INFO',
    face: 'img/unknown.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
