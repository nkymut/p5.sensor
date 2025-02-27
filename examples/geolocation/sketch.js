function setup() {
  let interval = 10000;
  requestGeolocation(handleGeolocation, interval);
}

function handleGeolocation(position) {
  console.log(`Latitude: ${position.coords.latitude}`);
  console.log(`Longitude: ${position.coords.longitude}`);
}