const spawn = require("child_process").spawn

/**
 *
 * @param {*} lat, set of latitudes
 * @param {*} long, set of longitudes
 * @returns k, number of clusters to be generated by invoking a python script
 */
const exec = async (lat, long) => {
  var k = 1,
    error

  const process = spawn("python", ["./getOptimumK.py", lat, long])

  for await (const chunk of process.stdout) {
    k = chunk
  }

  for await (const err of process.stderr) {
    error = err
  }

  if (error) {
    console.log(`stderr: ${error}`)
  }

  return k
}

module.exports = {exec}
