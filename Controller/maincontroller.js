const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const fetch = require('node-fetch');

//Importing the data from the url api.

exports.get_api_data = async function(request, response){
    try{
        let api_data_response = await fetch("http://dummy.restapiexample.com/api/v1/employees");
    if (api_data_response.ok) { 
        let employee_json = await api_data_response.json();
        response.status(200).json(employee_json);
      } else {
        console.log(api_data_response.status);
      }
    }catch(e){
        console.log('error fetching data:' , e);
    }
}

//getting employee of specific id
exports.getById = async function(request, response){
    let emp = await Employee.findById(request.params.id);
    return response.status(200).json(emp);
}


//getting all the employees
exports.get = async function(request, response){
    const employees = await Employee.find({});
    return response.status(200).json(employees);

}

//adding new employee data.
exports.create =  async function(request, response){
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let emp = new Employee();
    emp.id = id;
    emp.employee_name = employee_name;
    emp.employee_age = employee_age;
    emp.employee_salary = employee_salary;
    emp.profile_image = profile_image;
    await emp.save();
    return response.status(201).json(emp);
}

//updating employee of a specific id.
exports.update = async function(request, response){
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let emp = await Employee.findById(request.params.id);
    if(!emp){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        emp.id = id;
    emp.employee_name = employee_name;
    emp.employee_age = employee_age;
    emp.employee_salary = employee_salary;
    emp.profile_image = profile_image;
    await emp.save();
    return response.status(200).json(emp);
    }
}

//delete employee of specific id.
exports.destroy = async function(request, response){
    let emp = await Employee.findById(request.params.id);
    if(!emp){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        await emp.remove();
        return response.status(204).json(emp);
    }
}


