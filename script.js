function fetchData() {
    fetch('https://api.data.gov.sg/v1/environment/psi')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateTable(data); // Call the function to update the table with the fetched data
            updateTimestamp(); // Call the function to update the timestamp
            updateStatus(data.api_info.status); // Call the function to update the status
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function updateStatus(status) {
    var statusElement = document.getElementById("status");
    var statusText = status.toLowerCase();
    statusText = statusText.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
    statusElement.textContent = "Status : " + statusText;
    statusElement.style.color = "green"; // You might want to adjust this based on the actual status
}

fetchData();

function updateTable(data) {
    let readings = data.items[0].readings;

    let metrics = [
        "o3_sub_index",
        "pm10_twenty_four_hourly",
        "pm10_sub_index",
        "co_sub_index",
        "pm25_twenty_four_hourly",
        "so2_sub_index",
        "co_eight_hour_max",
        "no2_one_hour_max",
        "so2_twenty_four_hourly",
        "pm25_sub_index",
        "psi_twenty_four_hourly",
        "o3_eight_hour_max",
    ];
    let regions = ["central", "west", "east", "north", "south"];

    $("#PSItable").empty();

    let headerRow = "<tr><th>Metric</th>";
    for (let region of regions) {
        headerRow += "<th>" + region + "</th>";
    }
    headerRow += "</tr>";
    $("#PSItable").append(headerRow);

    for (let metric of metrics) {
        let row = "<tr><td>" + metric + "</td>";
        for (let region of regions) {
            let value = readings[metric][region];
            row += "<td>" + value + "</td>"; 
        }
        row += "</tr>";
        $("#PSItable").append(row); 
    }
}

// Function to update the timestamp live
function updateTimestamp() {
    let timestamp = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    $("#timestring").text("Updated at: " + timestamp);
}

// Update the timestamp every second
setInterval(updateTimestamp, 1000);
