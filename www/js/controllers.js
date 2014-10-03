angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('MapCtrl', function($scope) {
  
  $scope.locations = [
    { ID: 08, Name: 'Koxixos', Address: 'Av. Gov Irineu Bornhausen, 3933', Latitude: '-27.573228', Longitude: '-48.539657' }
  ];

  $scope.latlng = new google.maps.LatLng($scope.locations[0].Latitude, $scope.locations[0].Longitude);
  
  $scope.map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 11,
    center: $scope.latlng,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },        
  });
  
  $scope.infoBoxContent =
'<div id="infobox">'+
  '<p class="titulo">' + $scope.locations[0].Name + '</p>'+
  '<p class="Address"> ' + $scope.locations[0].Address + '</p>'+
  '<p><a href="http://maps.google.com?ll=' + $scope.locations[0].Latitude + ',' + $scope.locations[0].Longitude + '&amp;q=' + $scope.locations[0].Address  + '" target="_blank">Open in Google Maps</a></p>'+
'</div>';

  $scope.marker = new google.maps.Marker({
    position: $scope.latlng,
    map: $scope.map,
    visible: true,
    infoBoxContent: $scope.infoBoxContent
  });
  
  $scope.infoBox = new InfoBox({
    disableAutoPan: true,
    maxWidth: 150,
    pixelOffset: new google.maps.Size(-140, 0),
    zIndex: null,
    boxStyle: {
        background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
        opacity: 1,
        width: "280px"
    },
    closeBoxMargin: "18px 10px",
    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    infoBoxClearance: new google.maps.Size(1, 1)
  });
  
  google.maps.event.addListener($scope.marker, 'click', function() {
    $scope.infoBox.setContent(this.infoBoxContent);
    $scope.infoBox.open($scope.map, this);
  });
  
})

.controller('AccountCtrl', function($scope) {
});
