// Import required modules
const parkingData = require("../data/parkingData");

// Define recommendation algorithm function
exports.findParkingLocations = async (lat, lng, radius) => {
  // Filter parking locations within the specified radius of the user's location
  const parkingLocations = parkingData.filter((location) => {
    const distance = getDistanceFromLatLonInKm(
      lat,
      lng,
      location.lat,
      location.lng
    );
    return distance <= radius;
  });

  // Sort parking locations by distance from the user's location
  parkingLocations.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(lat, lng, a.lat, a.lng);
    const distanceB = getDistanceFromLatLonInKm(lat, lng, b.lat, b.lng);
    return distanceA - distanceB;
  });

  // Return the top 10 recommended parking locations
  return parkingLocations.slice(0, 10);
};

// Define helper function to calculate distance between two points
function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

// Define helper function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
