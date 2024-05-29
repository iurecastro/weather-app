$(document).ready(function() {
    $('#getWeather').click(function() {
        var city = $('#city').val();
        var apiKey = '61538e887ed4fed7f22eb8fe41fb2292'; 
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        // Get current weather
        $.ajax({
            url: weatherUrl,
            method: 'GET',
            success: function(data) {
                $('#temperature').text(data.main.temp + ' °C');
                $('#humidity').text(data.main.humidity + ' %');
                $('#condition').text(data.weather[0].description);
            },
            error: function() {
                alert('Error retrieving weather data. Please try again.');
            }
        });

        // Get weather forecast
        $.ajax({
            url: forecastUrl,
            method: 'GET',
            success: function(data) {
                $('#forecast').empty();
                for (var i = 0; i < data.list.length; i += 8) {
                    var forecastDate = new Date(data.list[i].dt_txt).toDateString();
                    var forecastTemp = data.list[i].main.temp;
                    var forecastCondition = data.list[i].weather[0].description;
                    $('#forecast').append(
                        `<div class="forecast-day">
                            <p>${forecastDate}</p>
                            <p>Temp: ${forecastTemp} °C</p>
                            <p>${forecastCondition}</p>
                        </div>`
                    );
                }
            },
            error: function() {
                alert('Error retrieving forecast data. Please try again.');
            }
        });
    });
});
