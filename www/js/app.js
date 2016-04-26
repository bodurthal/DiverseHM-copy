// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.service.core','ngCordova', 'ionic.service.push'])

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.




.controller('FeedController', function($scope, $http) {
            // init a empty scope variable
            $scope.posts = [];
            
            // set the feed url
            var url = "https://diversehm1887.wordpress.com/feed/";
            // set the url to google, to convert the cml feed to json
            var google_converter = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";
            
            // start the request
            var request = $http.jsonp(google_converter+ encodeURIComponent(url));
            // after the request is successful
            request.success(function(res){
                            // pass the requested entries to the view
                            $scope.posts = res.responseData.feed.entries;
                            
                            
                            });
            })
.controller('RedditCtrl', function($http, $scope) {

            $scope.stories =[];
            
            $http.get('http://www.reddit.com/r/Android/new/.json')
            .success(function(response) {
                     angular.forEach(response.data.children, function(child) {
                                     $scope.stories.push(child.data);
                                     
                                     });
                    
                     });
            
        
            })




.controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
            
            
            $scope.identifyUser = function() {
            var user = $ionicUser.get();
            if(!user.user_id) {
            // Set your user_id here, or generate a random one.
            user.user_id = $ionicUser.generateGUID();
            };
            
            // Metadata
            angular.extend(user, {
                           name: 'Simon',
                           bio: 'Author of Devdactic'
                           });
            
            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function(){
                                           $scope.identified = true;
                                           console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
                                           });
            };
            
            
            
            // Registers a device for push notifications
            $scope.pushRegister = function() {
            console.log('Ionic Push: Registering user');
            
            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                                canShowAlert: true, //Can pushes show an alert on your screen?
                                canSetBadge: true, //Can pushes update app icon badges?
                                canPlaySound: true, //Can notifications play a sound?
                                canRunActionsOnWake: true, //Can run actions outside the app,
                                onNotification: function(notification) {
                                // Handle new push notifications here
                                return true;
                                }
                                });
            };
            
            
           
            $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                           alert("Successfully registered token " + data.token);
                           console.log('Ionic Push: Got token ', data.token, data.platform);
                           $scope.token = data.token;
                           });
            
            })


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});









