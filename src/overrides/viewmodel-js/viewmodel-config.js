// EXAMPLE: Adding a new Expression Language Type
// Declare a new Expression Language Type
// const exampleExpressionLanguageType = {
//     namespace: 'pc', // Optional namespace for Expression Type
//     type: {  // Required Expression Language Object which should contain function properties that correspond to your backend Expression Object
//         getValue(val) {
//             return val || 'default value';
//         }
//     }
// }

// EXAMPLE - Adding a new Validation function
// const exampleArrLength = (a) => {
//     return a ? a.length : 0;
// }

// Export Expression Types and Validation Functions
module.exports = {
    // Types
    // Key should match the backend package name for your Expression Object
    // Value should be your new Expression Language Type
    types: {
        // 'gw.api.example.ExampleExpressionLanguageType': exampleExpressionLanguageType,
    },
    // Validations
    // Function name should match backend validation function
    validations: {
        // exampleArrLength,
    },
    validationMessagesToIgnore: [
        // validation messages that the view model surfaces that Jutro might duplicate

        // This field is required
        'displaykey.Edge.Web.Api.Model.NotNull',
        // Value entered must be a valid phone number
        'displaykey.Edge.Web.Api.Model.Phone'
    ]
}