const {Schema } = require('mongoose');

const coffeeSchema = new Schema ({
    coffee: [
        {
            type: String,
        }
    ],

    milk: [
        {
            type: String,
        }
    ],
    size: [
        {
            type: String,
        }
    ],
    sugar: {
        type: Number,
    },
});

module.exports = coffeeSchema;