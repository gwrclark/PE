
module.exports = {
    // use to map the type name of a schedule item to the value path
    // EXAMPLE types
    valueTypeMap: {
        // TYPEKEY: 'typeCodeValue',
        // STRING: 'stringValue',
        // LOCATION: 'locationValue',
    },
    // use to map the type name of a schedule item to the field dataType
    // EXAMPLE types
    valueTypeDatatypeMap: {
        // TYPEKEY: 'select',
        // INTEGER: 'number',
        // DATE: 'date',
    },
    // use to map the type name of a schedule item to the dataType componentProp of the input field
    // EXAMPLE types
    valueTypePropDatatypeMap: {
        // TYPEKEY: 'string',
        // INTEGER: 'number',
        // DATE: 'string',
    },
    // use to declare new schedule item types and their component
    // EXAMPLE
    SCHEDULE_ITEM_TYPES: {
        // CUSTOMSCHEDULEITEM: CustomScheduleItemComponent,
    },
    // function used to format the display of an address on a schedule item
    // EXAMPLE
    // formatAddress: (address) => {
    //     const addressValues = [
    //         address.city,
    //         address.addressLine1,
    //         address.addressLine2,
    //         address.addressLine3,
    //         address.postalCode,
    //         address.state
    //     ].filter((addressValue) => addressValue !== undefined);
    
    //     return address ? addressValues.join(', ') : undefined;
    // },

    // function use to format the display of schedule item properties
    // receives the schedule item value, type, and any property information
    // EXAMPLE
    // getFormattedValue: (value, valueType, propertyInfo) => {
    //     if (valueType === 'LOCATION') {
    //         const address = _.get(value, 'address', {});
    //         return formatAddress(address);
    //     }
    // },
}