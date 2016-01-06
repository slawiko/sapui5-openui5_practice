(function(){
	var searchInput = document.querySelector('.search-field'),
		searchButton = document.querySelector('.search-button'),
		geolocateButton = document.querySelector('.geolocate-button'),
		content = document.querySelector('.info'),
		APPID = 'fbc0c292211bd06b6b05a28f75cd9ede&units',
		units = 'metric',
		searchHistory = [],
		searchButtonEventHandler = function() {
			if (searchInput.value !== '') {
				if (localStorage['searchHistory']) {
					searchHistory = JSON.parse(localStorage['searchHistory']);
				}
				searchHistory.push(searchInput.value);
				localStorage['searchHistory'] = JSON.stringify(searchHistory);
				get('http://api.openweathermap.org/data/2.5/weather?APPID=' + APPID + '&units=' + units + '&q=' + searchInput.value)
					.then(function (success) {
						fillInfo(content, JSON.parse(success.responseText));
					}, function (error) {
						console.log(error.responseText);
					});
			}
		},
		fillHistory = function() {
			var historyDiv = document.querySelector('.history');
			while (historyDiv.firstChild) { // clean history div
				historyDiv.removeChild(historyDiv.firstChild);
			}
			if (localStorage['searchHistory']) {
				var historySpan,
					i;
				searchHistory = JSON.parse(localStorage['searchHistory']);
				for (i = 0; i < searchHistory.length; i++) { // fill history div
					historySpan = document.createElement('span');
					historySpan.setAttribute('class', 'value');
					historySpan.innerHTML = searchHistory[i];
					historyDiv.appendChild(historySpan);
				}
			}
		};

	fillHistory();

	searchButton.addEventListener('click', searchButtonEventHandler);
	searchInput.addEventListener('keydown', function(event) {
		if(event.keyCode === 13) searchButtonEventHandler();
	});

	geolocateButton.addEventListener('click', function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				if (localStorage['searchHistory']) {
					searchHistory = JSON.parse(localStorage['searchHistory']);
				}
				searchHistory.push(position.coords.longitude + ', ' + position.coords.latitude);
				localStorage['searchHistory'] = JSON.stringify(searchHistory);
				get('http://api.openweathermap.org/data/2.5/weather?APPID=' + APPID + '&units=metric&lon=' + position.coords.longitude + '&lat=' + position.coords.latitude)
					.then(function(success) {
						fillInfo(content, JSON.parse(success.responseText));
					}, function(error) {
						console.logg(error.responseText);
				});
			}, function(error) {
				console.log('geolocate error');
			});
		}
	});

	function get(url) {
		return new Promise(function (fulfilled, rejected) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.addEventListener('load', function() {
				if (request.status === 200) {
					fulfilled(request);
				} else {
					rejected(request);
				}
			});
			request.addEventListener('error', function() {
				console.log('Something goes wrong');
			});
			request.send();
		});
	}

	function fillInfo(content, data) {
		var city = content.querySelector('.city-value'),
		temperature = content.querySelector('.temperature-value'),
		pressure = content.querySelector('.pressure-value'),
		humidity = content.querySelector('.humidity-value'),
		sunrise = content.querySelector('.sunrise-value'),
		sunset = content.querySelector('.sunset-value'),
		geoСoords = content.querySelector('.geo-coords-value');

		fillHistory(); // add item in history

		city.innerHTML = data.name + ', ' + data.sys.country;
		temperature.innerHTML = data.main.temp + ' ˚C';
		pressure.innerHTML = data.main.pressure + ' hpa';
		humidity.innerHTML = data.main.humidity + ' %';
		sunrise.innerHTML = data.sys.sunrise;
		sunset.innerHTML = data.sys.sunset;
		geoСoords.innerHTML = data.coord.lon + ', ' + data.coord.lat;
	}

})();