// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .




function initMap() {
  var addressAuto = document.getElementById('address');
  var mapID = document.getElementById('map');
  var geolocation;
  var uluru = {
    lat: 1.352083,
    lng: 103.81983600000001
  }
  var map = new google.maps.Map(mapID, {
    center: uluru,
    zoom: 9
  });
  var autocomplete = new google.maps.places.Autocomplete(addressAuto);


  var geocoder = new google.maps.Geocoder();
  var submit = document.getElementById('submit');


  submit.addEventListener('click', function(){
    geocodeAddress(geocoder, map);
  });

  addressAuto.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      geocodeAddress(geocoder,map);
    }
  });
}


function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address':address}, function(results, status) {
    if (status == 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

      var infowindow = new google.maps.InfoWindow({
        content: address
      });
      marker.addListener('click', function(){
        infowindow.open(map, marker);
      });
    } else {
      alert('The search was not successful because ' + status);
    }
  });
}
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: 1000
      });
      var addressAuto = document.getElementById('address');
      var autocomplete = new google.maps.places.Autocomplete(addressAuto);
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function initialize() {
    initMap();
    geolocate();
}
