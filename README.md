# Simple Weather Application

A responsive web application that displays real-time weather information and a 5-day forecast for any given city, leveraging the OpenWeatherMap API.

## ✨ Features

* **Current Weather:** Displays temperature, weather description, humidity, wind speed, and pressure.
* **5-Day Forecast:** Shows a daily forecast (temperature, description, icon) for the next five days.
* **City Search:** Users can search for weather data by entering a city name.
* **Live Updates:** Fetches data from a reliable external API.
* **Responsive Design:** Optimized for various screen sizes (desktop and mobile).
* **Local Storage:** Remembers the last searched city for convenience.
* **Animations:** Subtle fade-in animations for a smoother user experience.

## 🚀 Technologies Used

* HTML5
* CSS3 (with Media Queries for responsiveness)
* JavaScript (Vanilla JS, Fetch API for asynchronous requests)
* OpenWeatherMap API (Current Weather Data & 5-Day Forecast)
* Font Awesome (for icons, if used)

## ⚙️ How to Run Locally

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

* **Web Browser:** Any modern web browser (Chrome, Firefox, Edge, Safari).
* **OpenWeatherMap API Key:** You need a free API key from [OpenWeatherMap.org](https://openweathermap.org/api).
    * Sign up/Sign in to OpenWeatherMap.
    * Navigate to your API keys section (`https://home.openweathermap.org/api_keys`).
    * Copy your default API key. (Note: New API keys might take 10-20 minutes to activate).

### Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/bramantyobj/simple-weather-app.git](https://github.com/bramantyobj/simple-weather-app.git)
    ```
    Navigate into the project directory:
    ```bash
    cd simple-weather-app
    ```

2.  **Configure API Key:**
    * Open the `script.js` file located in the project root.
    * Find the line `const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';`
    * Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key obtained from OpenWeatherMap.
        Example: `const API_KEY = '123abc456def7890abcdef1234567890ab';`

3.  **Open the Application:**
    Simply open the `index.html` file in your web browser. You can do this by:
    * Double-clicking the `index.html` file.
    * Right-clicking `index.html` and choosing "Open with" -> your preferred browser.
    * (Recommended for development) Using a "Live Server" extension in VS Code for live reloading capabilities.

The application should now be running in your browser. Enter a city name in the search box and press Enter or click the search button to see the weather!

## 📸 Screenshots

*(Anda bisa menambahkan screenshot aplikasi di sini. Contohnya:)*
![Screenshot 1: Current Weather Display](https://via.placeholder.com/600x400.png?text=Current+Weather+Screenshot)
![Screenshot 2: Forecast Display](https://via.placeholder.com/600x400.png?text=Forecast+Screenshot)
*(Ganti link placeholder dengan link gambar screenshot Anda. Anda bisa mengunggah screenshot ke GitHub Issues, imgur, atau langsung ke folder project di GitHub dan link dari sana.)*

## 📞 Contact

Feel free to reach out if you have any questions or feedback!

* [LinkedIn Profile](https://www.linkedin.com/in/bramantyobudijatmiko/)
* [Personal Website/Portfolio (Optional)](https://github.com/bramantyobj)
* [Email](mailto:bramantyobudi12@gmail.com)

---
*This project was created by Bramantyo Budi Jatmiko as part of learning front-end web development and API integration.*