// TASK 1: Configure Axios to communicate with the Coinbase cryptocurrency API.

// TASK 2: Define an array containing names of cryptocurrencies for data fetching.

// TASK 3: Write a JavaScript function to create and insert a canvas element into the HTML for each cryptocurrency.

// TASK 4: Inside this function, configure Chart.js to draw line charts with provided data.

// TASK 5: Develop an asynchronous function to request cryptocurrency prices from the Coinbase API.

// TASK 6: Format the timestamps into readable local time strings.

// TASK 7: Prepare price data for use in the Chart.js datasets.

// TASK 8: Call your function to display charts dynamically using the prepared data.

// TASK 9: Display a loading spinner during the data fetching process, removing it when data arrives.

// TASK 10: Set an interval to automatically refresh and update the charts every 10 seconds.


const loader = document.getElementById("loader-container");
const chartSection = document.getElementById("chart-section");
const fetchDataBtn = document.getElementById("fetch-data-btn");

const api = axios.create({
    baseURL: "https://api.coinbase.com/v2/assets/prices"
})

const coins = ["bitcoin", "ethereum", "litecoin"];

const fetchData = async () => {
    chartSection.innerHTML = "";
    loader.style.display = "flex";

    try {
        const responses = await Promise.all(
            coins.map(async (coin) => {
                const response = await api.get(`${coin}`);
                const prices = response.data.data.prices.hour.prices.slice(0, 24);
                // console.log(prices)

                //sorted timestamps array
                const labels = prices.map(([, timestamp]) => 
                    timestamp * 1000
                ).sort((a, b) => a - b);
                console.log(labels)

                const sortedTimeLabels = labels.map((label) => 
                    new Date(label).toLocaleTimeString()
                );
                console.log(sortedTimeLabels)

                const data = prices.map(([price]) => Number(price))
                return {coinId: coin, sortedTimeLabels, data, symbol: response.data.data.base}
            })
        )
        loader.style.display = "none";

        responses.forEach((res) => 
            createChart(res.coinId, res.sortedTimeLabels, res.data, res.symbol)
        )
        console.log(responses)
    } catch (error) {
        loader.style.display = "none";
        console.error(error, ": Data could not be fetched.")
        chartSection.innerText = error + ": Data could not be fetched.";
    }
}

const createChart = (coinId, labels, data, symbol) => {
    const canvas = document.createElement("canvas");
    canvas.id = coinId;

    new Chart(canvas, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: `${symbol} hourly prices`,
                data,
                borderWidth: 1
            }]
        },
        options: {
            animations: true,
            fill: true,
            plugins: {
                tooltip: {
                    intersect: true
                }
            },
            scales: {
            y: {
                title: {
                    text: "Price in US$",
                    display: true
                }
            }
        }
        }
    })
    chartSection.appendChild(canvas);
}

fetchDataBtn.addEventListener("click", () => {
    fetchData();
    const repeatedCall = setInterval(fetchData, 10000);

    setTimeout(() => clearInterval(repeatedCall), 35000)
})

