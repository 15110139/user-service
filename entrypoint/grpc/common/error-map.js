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
const grpc = require('grpc')

const ErrorMap = (error, errorMapping, fallbackMessage) => {
    if (errorMapping[error.name]) {
        return {
            code: errorMapping[error.name],
            message: error.message
        };
    } else {
        return {
            code: grpc.status.INTERNAL,
            message: fallbackMessage
        };
    }
};

module.exports.ErrorMap = ErrorMap;