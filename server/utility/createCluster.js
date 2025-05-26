const kMeans = require("node-kmeans")
const Store = require("../model/store")
const computeDistance = require("./computeDistance")
const calDensity = require("./densityToEpsilonMap")
const {ENDPOINTS} = require("../commons/endpoints")
const axios = require("axios")

/**
 *
 * @param {*} cluster, denotes set of all businesses in a city
 *  generates new clusters and updates the database
 */
const create = async (cluster) => {
  const stores = []
  var store,
    numClusters = 1

  for (var i = 0; i < cluster.poi.length; i++) {
    store = await Store.Store.findById(cluster.poi[i])
    stores.push(store)
  }

  const vector = []
  const lat = []
  const long = []
  var mean = 0

  stores.forEach((store) => {
    vector.push([store.latitude, store.longitude])
    lat.push(store.latitude)
    long.push(store.longitude)
  })

  if (stores.length > 1) {
    try {
      numClusters = await axios.post(ENDPOINTS.GET_OPTIMUM_K, {
        lat,
        long,
      })
      numClusters = numClusters?.data?.numClusters
    } catch (error) {
      console.log(error)
    }
  }

  kMeans.clusterize(vector, {k: numClusters}, async (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    cluster.clusters = result.map((clusterEntry) => ({
      ...clusterEntry,
    }))

    cluster.clusterSize = []

    for (const c of cluster.clusters) {
      const lat1 = c.centroid[0]
      const long1 = c.centroid[1]
      mean = 0
      for (const coords of c.cluster) {
        const lat2 = coords[0]
        const long2 = coords[1]
        mean += await computeDistance.computeDistance(lat1, long1, lat2, long2)
      }
      cluster.clusterSize.push(
        Math.pow(mean / c.clusterInd.length, 2) * Math.PI
      )
    }
    cluster.epsilon = await calDensity.calDensity(cluster)
    await cluster.save()
  })
}

module.exports = {create}
