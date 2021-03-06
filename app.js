/** @format */

let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;

window.addEventListener("load", () => {
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(long);
			console.log(lat);

			//const proxy = "https://cors-anywhere.herokuapp.com/"; In Case we face access denied problem we put this proxy link infront of our API.
			
			//This API gives us Climate and Temprature.
			const apiTemp = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily,minutely&appid=8dfb15d186962530cc9513ff022e6520`;
			fetch(apiTemp)
				.then((blob) => {
					return blob.json();
				})
				.then((info) => {
					console.log(info);
					var climateValue = info["current"]["weather"][0]["main"];
					var tempResult = info["current"]["temp"];
					climate.textContent = climateValue;
					tempValue.textContent = Math.round(tempResult - 273);
			});
			
			//This API Shows Us our Location
			const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=625037f0235064cf2de2b5f513b37f77`;		
			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					var main = data[0]["name"];
					loc.textContent = main;
				});
		});
	}
});
