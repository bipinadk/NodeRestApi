const express = require('express');
const route = express.Router();
const controller = require('../Controller/maincontroller.js');
const { routes } = require('../index.js');

//load the data
route.get('/load', controller.get_api_data);
//get all employee
route.get('/employee', controller.get);
//gets employee by id
route.get('/employee/:id', controller.getById);
//creates new employee
route.post('/employee', controller.create);
//updates an employee
route.put('/employee/:id', controller.update);
//deletes the employee of the given id
route.delete('/employee/:id', controller.destroy);


module.exports = route;