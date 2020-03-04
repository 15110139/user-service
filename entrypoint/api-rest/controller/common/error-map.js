/**
 * A number, or a string containing a number.
 * @typedef {Object} DataReturn
 * @property {Number} x - The X Coordinate
 * @property {String} y - The Y Coordinate
 */

/**
 * @param {Object} error
 * @param {Array} errorMapping
 * @param {String} fallbackMessage
 * @returns {Object} DataReturn
 */
const ErrorMap = (error, errorMapping, fallbackMessage) => {
  if (errorMapping[error.name]) {
    return {
      status: errorMapping[error.name],
      message: error.message
    };
  } else {
    return {
      status: 500,
      message: fallbackMessage
    };
  }
};

module.exports.ErrorMap = ErrorMap;
