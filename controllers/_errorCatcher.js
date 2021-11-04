function objectExists(object) {
  if (!object || object === undefined || object === null || object === '' || object == [] || object.length === 0) {
    return false // If object DOES NOT exist, return false.
  } else {
    return true // If object DOES exist, return true.
  }
};


function requiredInfo(body) {
  if (!body || body === undefined || body === null || body === '') {
    return false // If body DOES NOT exist, return false.
  } else {
    return true // If body DOES exist, return true.
  }
};

module.exports = {objectExists, requiredInfo};
