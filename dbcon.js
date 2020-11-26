const mongoose = require('mongoose');

mongoose.Promise=global.Promise;

//connecting mongodb
(async () => {
	try{
		await mongoose.connect('mongodb://localhost/employee', {useNewUrlParser: true});
        console.log('Mongodb is successfully connected');
    } catch(e) {
		console.log("Error connnecting mongodb.", e)
	}
})();

require('./model/employee_model.js');
require('./index.js');

