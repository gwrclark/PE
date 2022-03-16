/**
 * customer definitions for any added errors outside of Underwriting errors, validation errors etc
 * New errors should be added as customerErrors
 * @typedef {Array<customerError>} customerErrors
 */

/**
 * Definition of a customerError. 
 * @typedef {Object} customerError
 * @property {String} customerIssueName the name of the error defined
 * @property {function} customerMappingFunction function used to map the error response with
*/


module.exports = {
    /**
    *  define custom Error Levels like so:
    *  LEVEL_INFO: 'LEVEL_INFO'
    *  */
    ErrorLevel: {
    },
    /**
*  define custom Error types like so:
*  QUOTE_FAILED: 'QUOTE_FAILED
*  */
    ErrorType: {
    },
    /**
*  define custom underwriting blocking levels like so:
*  BLOCKS_QUOTE_FIRSTPASS: 'BLOCKS_QUOTE_FIRSTPASS
*  */
    UWBlockingPoint: {

    },
    customerErrors: [
    ]

};