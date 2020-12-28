const locations = [
    {"lat": "7.0131", "lng": "29.2418"},
    {"lat": "8.296968", "lng": "30.1531568"},
    {"lat": "6.814270872005028", "lng": "29.67688236445311"},
    {"lat": "6.5609799", "lng": "30.5020001"},
    {"lat": "7.315672510221059", "lng": "28.55053984375001"},
    {"lat": "7.171396093010727", "lng": "31.370150186718735"},
    {"lat": "7.001045993186105", "lng": "31.469027139843735"},
    {"lat": "6.876991899999999", "lng": "31.3069788"},
    {"lat": "4.859363", "lng": "31.57125"}, // first occurrence
    {"lat": "9.896184557180009", "lng": "32.1207559082031"},
    {"lat": "6.2132663", "lng": "31.5655424"},
    {"lat": "4.859363", "lng": "31.57125"}, // second occurrence
    {"lat": "6.807249400000001", "lng": "29.6788877"},
    {"lat": "9.5279875", "lng": "31.6682347"},
    {"lat": "4.846042788795081", "lng": "31.6150665664673"},
    {"lat": "4.836100565939659", "lng": "31.62480834960939"},
    {"lat": "4.749128682830305", "lng": "33.355955539062485"},
    {"lat": "4.6144063", "lng": "31.2626366"},
    {"lat": "9.4906566", "lng": "30.4530456"},
    {"lat": "9.8894202", "lng": "32.7181375"},
    {"lat": "4.973951916150222", "lng": "31.797066735156235"},
    {"lat": "4.722536339443783", "lng": "31.449404178125"}
];

function deg2rad(angleInDegree) {
    return angleInDegree * Math.PI / 180; // angle in radian
}

function haversideDistance(firstLocation, secondLocation) {
    const R = 6371e3; // metres
    const firstLocationLatitudeRadian = deg2rad(firstLocation.lat);
    const secondLocationLatitudeRadian = deg2rad(secondLocation.lat);
    const latitudeDifference = deg2rad(secondLocation.lat - firstLocation.lat);
    const longitudeDifference = deg2rad(secondLocation.lng - firstLocation.lng);

    const a = Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) + Math.cos(firstLocationLatitudeRadian) * Math.cos(secondLocationLatitudeRadian) * Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in metres
}

function handleDuplicateLocations(locations) {
    const variationFactor = 0.0001; // adjust this factor

    for (let i = 0; i < locations.length - 1; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            // check if locations are same
            if (locations[i].lat === locations[j].lat && locations[i].lng === locations[j].lng) {
                locations[j].lat = (parseFloat(locations[j].lat) + variationFactor).toString();
                locations[j].lng = (parseFloat(locations[j].lng) + variationFactor).toString();

                // TODO: comment in production
                const d = haversideDistance(locations[i], locations[j]);
                console.log(locations[i], locations[j], 'moved', d, 'meters');
            }
        }
    }
    return locations;
}

const newLocations = handleDuplicateLocations(locations);
console.log(newLocations);
