
const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
}

fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("projects-container");
        data.forEach(project => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";
            col.innerHTML = `
                <div class="card p-3 h-100">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.body}</p>
                </div>
            `;
            container.appendChild(col);
        });
    })
    .catch(err => console.error(err));


const apiKey = "48fed579f44676b43ca39b3f303e994c"; 
const button = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");

button.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            const { name, main, weather } = data;

            
            let html = `
                <h5>Weather in ${name}</h5>
                <p><strong>Temperature:</strong> ${main.temp} °C</p>
                <p><strong>Feels Like:</strong> ${main.feels_like} °C</p>
                <p><strong>Weather:</strong> ${weather[0].main} - ${weather[0].description}</p>
            `;

            
            let healthTip = "";

            if (main.temp > 30) {
                healthTip += "Stay hydrated and avoid direct sunlight. ";
            } else if (main.temp < 10) {
                healthTip += "Wear warm clothes to prevent cold-related illnesses. ";
            }

            if (weather[0].main.toLowerCase().includes("rain")) {
                healthTip += "Don't forget an umbrella to avoid getting sick. ";
            }

            if (weather[0].main.toLowerCase().includes("snow")) {
                healthTip += "Be careful when walking on icy surfaces. ";
            }

         
            html += `<p><strong>Health Tip:</strong> ${healthTip}</p>`;

            weatherResult.innerHTML = html;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}
