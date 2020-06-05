let map;
let marker;
let myLatLng = {lat: 49.2327800, lng: 28.4809700};
let weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ua&APPID=0b93cd070c7162d5291e75495a66f000";
let baseWeather;
	getWeather(weatherAPI);
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 10,
          styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e5c163"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#e5c163"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        });

        map.addListener('center_changed', function() {
          window.setTimeout(function() {
            map.panTo(marker.getPosition());
          }, 5000);
        });

        marker = new google.maps.Marker({
    		position: myLatLng,
    		map: map,
    		icon:'marker.png',
          	animation: google.maps.Animation.DROP,
    		title: 'Nice'
		});

        marker.addListener('click', function() {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
          if (marker.getAnimation() !== null) {
	          marker.setAnimation(null);
	          map.setZoom(10);
	        } else {
	          marker.setAnimation(google.maps.Animation.BOUNCE);
	       }
        });
        map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        myLatLng.lat = e.latLng.lat();
        myLatLng.lng = e.latLng.lng();
        var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+myLatLng.lat+"&lon="+myLatLng.lng+"&lang=ua&APPID=0b93cd070c7162d5291e75495a66f000";
        getWeather(weatherAPI);
        });
 		function placeMarker(location) {
        if (marker == null){
            marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });
          }else {
              marker.setPosition(location);
            }
    	}   
    }

	function getWeather(weatherAPI){
          fetch(weatherAPI)  
		  .then(  
		    function(response) {  
		      if (response.status !== 200) {  
		        console.log('Looks like there was a problem. Status Code: ' + response.status);  
		        return;  
		      }  
		      response.json().then(function(data) {  
		        baseWeather = data;
            	showWeather();
            	console.log(baseWeather);  
		      });  
		    }  
		  )  
		  .catch(function(err) {  
		    console.log('Fetch Error :-S', err);  
		  });
        }
        function showWeather(){
          contentInfo = 
          "<br>"+"  Обране місто : "+"<br>"+baseWeather.name +"<br>"+"<br>"+"  Погода :"+"<br>"+baseWeather.weather[0].description +"<br>"+"<br>"+
          "  Температура : " +"<br>"+ Math.floor(baseWeather.main.temp - 273.15) +" °C"+"<br>"+"<br>";
          document.getElementById('display').innerHTML=contentInfo +"<br>"+'<image src="http://openweathermap.org/img/w/'+baseWeather.weather[0].icon+'.png" hspace="65" height="70" width="70">';
        }
