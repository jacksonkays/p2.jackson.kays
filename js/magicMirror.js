let newsWidget, weatherWidget, spotifyWidget, healthWidget, clockWidget, calendarWidget;
let weatherIcon, albumCover;
let width = 1400;
let height = 1000;
function setup() {

    let canvas = createCanvas(width,height);

    capture = createCapture(VIDEO);
    capture.size(width,height);
    capture.hide();

    newsWidget = new NewsWidget(950, 505, 400, 200);
    getNews();

    weatherWidget = new WeatherWidget(50, 45, 200, 200);
    getWeather();

    spotifyWidget = new SpotifyWidget(50, 265, 300, 200);

    healthWidget = new HealthWidget(50, 505, 400, 200);

    clockWidget = new ClockWidget(521, 33, 400, 100);

    calendarWidget = new CalendarWidget(1100, 45, 250, 400);
}

function draw() {
    background(255);

    translate(width, 0);
    scale(-1.0, 1.0);
    image(capture, 0, 0, 1400, 750);

    translate(width, 0);
    scale(-1.0, 1.0);

    newsWidget.update();
    newsWidget.over();
    newsWidget.show();

    weatherWidget.update();
    weatherWidget.over();
    weatherWidget.show();

    spotifyWidget.update();
    spotifyWidget.over();
    spotifyWidget.show();

    healthWidget.update();
    healthWidget.over();
    healthWidget.show();

    clockWidget.update();
    clockWidget.over();
    clockWidget.show();

    calendarWidget.update();
    calendarWidget.over();
    calendarWidget.show();

    fill(255);

}

function mousePressed() {
    newsWidget.pressed();
    weatherWidget.pressed();
    spotifyWidget.pressed();
    healthWidget.pressed();
    clockWidget.pressed();
    calendarWidget.pressed();
  }
  function mouseReleased() {
    newsWidget.released();
    weatherWidget.released();
    spotifyWidget.released();
    healthWidget.released();
    clockWidget.released();
    calendarWidget.released();
  }

  async function getWeather() {
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json();
    console.log(json);
    weatherWidget.currentTemp = json.properties.periods[0].temperature;
    weatherWidget.description = json.properties.periods[0].shortForecast;
    //use description to determine which icon asset to use
    if (weatherWidget.description.includes('Clear')) {
      if (hour() > 19 || hour() < 7) {
        weatherIcon = loadImage('assets/clear-night.svg');
      }
      else {weatherIcon = loadImage('assets/clear-day.svg');}
    }
    else if (weatherWidget.description.includes('Cloudy')) {
      if (hour() > 19 || hour() < 7) {
        weatherIcon = loadImage('assets/cloudy-night.svg');
      }
      else {weatherIcon = loadImage('assets/cloudy-day.svg');}
    }
    else if (weatherWidget.description.includes('Raining')) {
      if (hour() > 19 || hour() < 7) {
        weatherIcon = loadImage('assets/raining-night.svg');
      }
      else {weatherIcon = loadImage('assets/raining-day.svg');}
    }
    else if (weatherWidget.description.includes('Thunderstorm')) {
      if (hour() > 19 || hour() < 7) {
        weatherIcon = loadImage('assets/thunderstorm-night.svg');
      }
      else {weatherIcon = loadImage('assets/thunderstorm-day.svg');}
    }
    else if (weatherWidget.description.includes('Sunny')) {
      weatherIcon = loadImage('assets/sunny.svg');
    }
    weatherIcon.resize(100,100);
    weatherWidget.icon = weatherIcon;
  }

  async function getNews() {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd53fccd05ad4930a2d4aebfdca0d101');
    const json = await response.json();
    console.log(json);
    newsWidget.story1Title = json.articles[0].title;
    if (json.articles[0].author){
      newsWidget.story1Author = json.articles[0].author;
    }
    else {
      newsWidget.story1Author = json.articles[0].source.name;
    }
    newsWidget.story2Title = json.articles[1].title;
    if (json.articles[1].author){
      newsWidget.story2Author = json.articles[1].author;
    }
    else {
      newsWidget.story2Author = json.articles[1].source.name;
    }
  }
