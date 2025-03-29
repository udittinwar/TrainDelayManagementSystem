const urlParams = new URLSearchParams(window.location.search);
const trainNumber = urlParams.get('train') || "N/A";
const trainName = urlParams.get('name') ? decodeURIComponent(urlParams.get('name')) : "N/A";


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("train-info").textContent = `${trainName} (${trainNumber})`;
});
