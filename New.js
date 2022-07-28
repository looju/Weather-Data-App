let weather = {
  apiKey: "e0426c2a874c83bef8464b9c958a87f4", //api key from openweathermap api (one call api)
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    ) //calling the API 
      .then((response) => {  //promises
        if (!response.ok) { 
          alert("No weather found."); //for server errors such as 404
          throw new Error("No weather found."); 
        }
        return response.json();  
      })
      .then((data) => this.displayWeather(data));  //display weather information 
  },
  displayWeather: function (data) {
    const { name } = data;  
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind; //here, we are setting the variables to their API values
    document.querySelector(".city").innerText = "Weather in " + name;  //DOM element using querySelector 
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; // to display the weather icon from the api to the user
    document.querySelector(".description").innerText = description; // to set the innerText of the description element to the description from the API
    document.querySelector(".temp").innerText = temp + "°C"; //setting to display the temperature from the API. It's normally a metric unit so we just concatenate it with C
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";  // DOM to display humidity values
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h"; // DOM to display wind speed values
    document.querySelector(".weather").classList.remove("loading"); 
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value); //the value from the search bar is used for the search. Therefore, weather.search() returns the search result of the value from the search bar
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search(); // when the search icon is clicked, the weather.search method is called with the value from the searchbar
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {  //once user releases key, it triggers the event function
    if (event.key == "Enter") { //that is, if the key that is released is the "enter" key, it triggers the search through weather
      weather.search();
    }
  });
weather.fetchWeather("Lagos"); // users Lagos as default city in the fetchweather function
