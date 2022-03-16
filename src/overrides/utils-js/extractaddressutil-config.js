/**
* The sample definition below replicates the current code in ExtractAddressUtil
* Implementation should be as follows:
* 1. define getAddress as seen below
* 2. Implement specific custom functionality for your region
* 3. set the "applyCustomerConfig" flag to true
 */

module.exports = {

    /**
     * function to allow customers to define their own logic
     * to handle internalisation for addresses; 
     * customers in different regions may use state or jurisdiction
     * For example: 
     * In Japan, prefecture may be used in place of state
     * In Canada, province may be used in place of state
     * 
     * To implement a custom getAddress function, follow these steps:
     * 1. define a function as below, ensure that it takes the same addressComponents object
     * 2. Implement the specific custom logic required. 
     * @param {Object} addressComponents - a component containing the address details passed in
     * @returns {Object}
     * getAddress: (addressComponents) => {}
     */
}