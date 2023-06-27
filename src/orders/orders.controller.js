const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

//list function
function list(req, res, next) {
    res.json({ data: orders });
}

//order validator
function newOrderValidator(req, res, next) {
    const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;

    const requiredFields = {
        deliverTo,
        mobileNumber,
        dishes,
    };

    for (let field in requiredFields) {
        if (!requiredFields[field]) {
            return next({
                status: 400,
                message: `Order must include a ${field}`
            });
        }
    }

    const dishesValue = requiredFields.dishes;

    if (!Array.isArray(dishesValue) || dishesValue.length === 0){
        return next({
            status: 400,
            message: 'Order must include at least one dish',
        });
    }

    for (let i = 0; i < dishesValue.length; i++){
        const quantity = dishesValue[i].quantity;
        if (!quantity || quantity <= 0 || typeof quantity !== "number"){
            return next ({
                status:400,
                message: `Dish ${i} must have a quantity that is a number greater than zero`,
            });
        }
    }
    next();
}

//create function
function create(req, res, next) {
    const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;
  
    const newOrder = {
      id: nextId(),
      deliverTo,
      mobileNumber,
      dishes,
    };
  
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
  }


module.exports = {
    list,
    create: [
        newOrderValidator,
        create
    ],

}
