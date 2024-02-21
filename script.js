var jsonData = {
    region_metadata: [
        {
            name: "west",
            label_location: { latitude: 1.35735, longitude: 103.7 },
        },
        {
            name: "east",
            label_location: { latitude: 1.35735, longitude: 103.94 },
        },
        {
            name: "central",
            label_location: { latitude: 1.35735, longitude: 103.82 },
        },
        {
            name: "south",
            label_location: { latitude: 1.29587, longitude: 103.82 },
        },
        {
            name: "north",
            label_location: { latitude: 1.41803, longitude: 103.82 },
        },
    ],
    items: [
        {
            timestamp: "2024-02-12T12:00:00+08:00",
            update_timestamp: "2024-02-12T12:00:35+08:00",
            readings: {
                o3_sub_index: {
                    west: 7,
                    east: 7,
                    central: 12,
                    south: 12,
                    north: 18,
                },
                pm10_twenty_four_hourly: {
                    west: 33,
                    east: 36,
                    central: 31,
                    south: 32,
                    north: 53,
                },
                pm10_sub_index: {
                    west: 33,
                    east: 36,
                    central: 31,
                    south: 32,
                    north: 52,
                },
                co_sub_index: {
                    west: 5,
                    east: 3,
                    central: 4,
                    south: 4,
                    north: 5,
                },
                pm25_twenty_four_hourly: {
                    west: 13,
                    east: 22,
                    central: 15,
                    south: 16,
                    north: 11,
                },
                so2_sub_index: {
                    west: 2,
                    east: 1,
                    central: 2,
                    south: 2,
                    north: 2,
                },
                co_eight_hour_max: {
                    west: 1,
                    east: 0,
                    central: 0,
                    south: 0,
                    north: 0,
                },
                no2_one_hour_max: {
                    west: 9,
                    east: 13,
                    central: 10,
                    south: 10,
                    north: 3,
                },
                so2_twenty_four_hourly: {
                    west: 4,
                    east: 1,
                    central: 3,
                    south: 3,
                    north: 4,
                },
                pm25_sub_index: {
                    west: 52,
                    east: 63,
                    central: 54,
                    south: 55,
                    north: 46,
                },
                psi_twenty_four_hourly: {
                    west: 52,
                    east: 63,
                    central: 54,
                    south: 55,
                    north: 52,
                },
                o3_eight_hour_max: {
                    west: 18,
                    east: 17,
                    central: 28,
                    south: 28,
                    north: 42,
                },
            },
        },
    ],
    api_info: { status: "healthy" },
};

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

    // Loop through each metric
    for (let metric of metrics) {
        let row = "<tr><td>" + metric + "</td>";
        for (let region of regions) {
            let value = readings[metric][region];
            row += "<td>" + value + "</td>"; 
        }
        row += "</tr>";
        $("#PSItable").append(row); // Append the row to the table
    }
}

// Function to update the timestamp live
function updateTimestamp() {
    let timestamp = new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    $("#timestring").text("Updated at: " + timestamp);
}

updateTable(jsonData);

updateTimestamp();

// Update the timestamp every second
setInterval(updateTimestamp, 1000);

var statusElement = document.getElementById("status");
var statusText = jsonData.api_info.status.toLowerCase();
statusText = statusText.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
});
statusElement.textContent = "Status : " + statusText;
statusElement.style.color = "green";
