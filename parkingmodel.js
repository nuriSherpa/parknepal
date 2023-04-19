const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  weeklyRate: { type: Number, required: true },
  monthlyRate: { type: Number, required: true },
});

// Define a virtual property "price" based on the "duration" input
parkingSchema.virtual("price").get(function () {
  return function (duration) {
    const hours = duration / 60; // convert minutes to hours
    if (hours < 24) {
      return hours * this.hourlyRate;
    } else if (hours < 168) {
      return Math.ceil(hours / 24) * this.dailyRate;
    } else if (hours < 720) {
      return Math.ceil(hours / 168) * this.weeklyRate;
    } else {
      return Math.ceil(hours / 720) * this.monthlyRate;
    }
  };
});

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
