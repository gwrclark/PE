module.exports = {
    /**
     * Configurable masks for customer input
     * Masks must match the format below:
     * amex: {
     *  mask: '9999-999999-99999'
     *  },
     */
    creditCardMasks: {

    },

    /**
     * Define a customer default for credit cards
     * This should be a string and correspond to a mask 
     * in the customerCreditCardMasks object
     */
    defaultCardType: null
}