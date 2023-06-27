const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

//list function
function list(req, res, next) {
    res.json({ data: dishes });
}

function dishValidator(req, res, next) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    //validate all dish fields
    const requiredFields = {
        name,
        description, 
        price,
        image_url,
    };

    for (let field in requiredFields) {
        if (!requiredFields[field]) {
            return next({ status: 400, message: `Dish must include a ${field}`});
        }
    }
    //validate dish price
    const dishPrice = requiredFields.price;

    if (typeof dishPrice !== "number" || dishPrice <= 0) {
        return next({
            status: 400,
            message: "Dish must have a price that is a number greater than 0"
        });
    }

    next();
}

//create function
function create(req, res, next) {
    const { data: { name, description, price, image_url } = {} } = req.body;
    
    const newDish = {
        id: nextId(),
        name,
        description,
        price,
        image_url,
    };

    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

module.exports = {
    list,
    create: [
        dishValidator,
        create
    ],

}
