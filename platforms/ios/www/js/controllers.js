angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.getTren = function(url){
    $http.jsonp(url).
    success(function(data, status) {
      $scope.result = data;
    }).
    error(function(data, status) {
      $scope.result = data || "Request failed";
    });
  };

  $scope.getTren( 'http://mervapp.com/api/v1/station/nearest/?callback=JSON_CALLBACK' );
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  
  $scope.centerOnMe = function() {
    $scope.map = new google.maps.Map(document.getElementById("map-canvas"), {
      zoom: 16,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }    
    });

    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Geolocalizando...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      var LatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter(LatLng);

      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: LatLng,
        map: $scope.map,
        draggable:true,
        animation: google.maps.Animation.BOUNCE,
        title: 'Aquí estas!'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open($scope.map,marker);
      });

      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
      $ionicLoading.hide();
    });
  };

  $scope.centerOnMe();
  
})

.controller('AccountCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  });
})

.controller('ModalCtrl', function($scope) {
  
  $scope.newUser = {}; 
  
  $scope.createContact = function() {
    console.log('Create Contact', $scope.newUser);
    $scope.modal.hide();
  };
  
});
