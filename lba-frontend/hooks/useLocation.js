import {useEffect, useState} from "react"
import * as Location from "expo-location"
import geoInd from "../geo_indistinguishability"
import axios from "axios"
import {CHECK_PROXIMITY_API} from "@env"
const computeDistance = require("../computeDistance")

const getAdData = async (epsilon, lat, long) => {
  try {
    const noisyCoords = await geoInd(epsilon, lat, long)
    var newAor = await computeDistance.computeDistance(
      lat,
      long,
      noisyCoords.noisyLat,
      noisyCoords.noisyLong
    )
    newAor = newAor * 1000 + 500

    const url =
      `${CHECK_PROXIMITY_API}` +
      "latitude=" +
      noisyCoords.noisyLat +
      "&longitude=" +
      noisyCoords.noisyLong +
      "&aor=" +
      newAor

    const nearByStores = await axios.get(url)
    return nearByStores
  } catch (error) {
    console.log(error)
  }
}
export default useLocation = () => {
  const [location, setLocation] = useState()
  const [adData, setAdData] = useState()

  const getLocation = async () => {
    try {
      const {granted} = await Location.requestBackgroundPermissionsAsync()
      if (!granted) return

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync()

      const data = await getAdData(0.01, latitude, longitude)
      // console.log({data})
      setAdData(data)
    } catch (error) {
      console.log({error, message: error.message})
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {adData, location}
}
