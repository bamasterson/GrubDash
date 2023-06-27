this is the GrubDash API app!

inside there are a few folders:

--utils contains the nextId function, used for giving a new id to an order

--dishes contains the dishes.controller file and the dishes.router file
    dishes.controller contains a few functions for creating and updating a dish on the app. the validator function is used to validate the dish. The list and create functions are implemented in the /dishes route. The read and update functions are implemented in the /dishes/:dishId route.

--orders contains similar files, all for creating, validating, and updating orders that are placed by customers in the App.