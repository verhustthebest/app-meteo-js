const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

// Cibles pour l'affichage
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");

btn.addEventListener("click", async () => {

    const ville = input.value;
    if (!ville) return alert("Veuillez saisir une ville");

    try {
        // Étape 1 : Trouver les coordonnées
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Ville non trouvée");

        const { latitude, longitude, name } = geoData.results[0];

        // Étape 2 : Récupérer la météo
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        // Étape 3 : Affichage
        cityName.textContent = "Ville : " + name;
        temp.textContent = "Température : " + weatherData.current_weather.temperature + "°C";

    } catch (error) {
        console.error("Erreur :", error);
        alert("Impossible de récupérer la météo.");
    }
});