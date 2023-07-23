const { Schema } = require('mongoose');

const coffeeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // 'User' refers to the model name for the User schema
        required: true,
    },
    coffee:
    {
        type: String,
    }
    ,
    milk:
    {
        type: String,
    }
    ,
    size:
    {
        type: String,
    }
    ,
    sugar: {
        type: Number,
    },
},{timestamps:true});

module.exports = coffeeSchema;