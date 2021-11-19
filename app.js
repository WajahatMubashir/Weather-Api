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

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=625037f0235064cf2de2b5f513b37f77`;
			

			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					var main = data[0]["name"];
					var tempResult = data["current"]["temp"];
					loc.textContent = main;
					climate.textContent = tempResult;
					tempValue.textContent = Math.round(tempResult - 273);
				});
		});
	}
});
