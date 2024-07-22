const axios = require("axios")
const nodeGeocoder = require("node-geocoder")
const {stringify} = require("nodemon/lib/utils")

const API_KEY = process.env.GEOCODER_API_KEY
const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="
const REVERSE_GEO_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng="

const geocodeToCoords = async (address) => {
  try {
    const url = GEO_URL + address + "&key=" + API_KEY
    const res = await axios.get(url)
    return res.data.results[0].geometry.location
  } catch (error) {
    throw new Error("Geocoding failed!")
  }
}

const geocodeToCity = async (latitude, longitude) => {
  const options = {
    provider: "openstreetmap",
    httpAdapter: "https",
    formatter: "json",
  }

  try {
    const geocoder = nodeGeocoder(options)
    const res = await geocoder.reverse({lat: latitude, lon: longitude})
    return res[0].city
  } catch (error) {
    throw new Error("Reverse Geocoding failed!")
  }
}

module.exports = {geocodeToCoords, geocodeToCity}
