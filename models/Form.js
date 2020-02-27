const mongoose = require('mongoose');
const schema = mongoose.Schema;
const formSchema = schema({
    id: {
        type: String,
        trim: true,
        unique: true,
        //required:true,
    },
    unit_number: {
        type: String,
        trim: true,
        //required:true,
    },
    property_type: {
        type: String,
        trim: true,
        //required:true,
    },
    category: {
        type: String,
        trim: true,
        //required:true,
    },
    location: {
        type: String,
        trim: true,
        //required:true,
    },
    bedrooms: {
        type: Number,
        trim: true,
        // required:true
    },
    bathrooms: {
        type: Number,
        // required:true
    },
    tour_days: {
        type: Number,
        // required:true
    },
    furnished_type: {
        type: String,
        // required:true
    },
    // unfurnished: {
    //     type: Boolean,
    //     // required:true
    // },
    // semi_furnished: {
    //     type: Boolean,
    //     // required:true
    // },
    // upgraded: {
    //     type: Boolean,
    //     // required:true
    // },
    listing_price: {
        type: Number,
        // required:true
    },
    title: {
        type: String
        // required:true
    },
    description: {
        type: String
        // required:true
    }


});




module.exports = mongoose.model('form', formSchema)