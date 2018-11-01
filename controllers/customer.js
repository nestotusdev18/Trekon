// customer.js
// Import customer model
var fs = require('fs');
const customers = require('../models/customer');

const config = require('../config/database');
const jwt = require('jsonwebtoken');
// Handle index actions
exports.index = function (req, res) {
    customers.get(function (err, customer) {
        if (err) {
            return  res.status(200).send({
               
                "isOperationSuccess": true,
                "recordId":customer._id,
                "recordType": "customer",
                "operationType": "Customers retrieved",
                "associationObjType": "",
                "successMessgae": "Customers retrieved failure",
                "errorCode": "",
                "errorMessage": err
              
                   
                });
        }
      
        return  res.status(200).send({
            data: customer,
            "isOperationSuccess": true,
            "recordId":customer._id,
            "recordType": "customer",
            "operationType": "Customers retrieved",
            "associationObjType": "",
            "successMessgae": "Customers retrieved successfully",
            "errorCode": "",
            "errorMessage": err
          
               
            });




    });
};


// single Customers retrieved
exports.singleCustomer = function (req, res) {
    customers.findById(req.params.customer_id, function (err, customer) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "single Customers retrieved",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
            return  res.status(200).send({
                  "data": customer,
                "isOperationSuccess": true,
                "recordId":customer._id,
                "recordType": "customer",
                "operationType": "single Customers retrieved",
                "associationObjType": "id",
                "successMessgae": "single Customers retrieved",
                "errorCode": "",
                "errorMessage": err
              
                   
                });
         
          
            
       
    });
};



// Handle create Customers actions
exports.new = function (req, res) {
    var customer = new customers();
    customer.customerName = req.body.customerName ? req.body.customerName : customer.customerName;
    customer.customerType = req.body.customerType ? req.body.customerType : customer.customerType;
    customer.isTest = req.body.isTest ? req.body.isTest : customer.isTest;
  
// save the customer and check for errors
customer.save(function (err) {
        if (err)
           res.status(500).send({
    
            "isOperationSuccess": false,
            "recordId": "",
            "recordType": "customer",
            "operationType": "Add New Customer",
            "associationObjType": "logo Name",
            "successMessgae": "Add New Customer failure",
            "errorCode": "",
            "errorMessage": err
          
               
            });
res.status(200).send({
    
        "isOperationSuccess": true,
        "recordId": customer._id,
        "recordType": "customer",
        "operationType": "Add",
        "associationObjType": "Add New Customer",
        "successMessgae": "Add New Customer successfully",
        "errorCode": "",
        "errorMessage": ""
      
           
        });
    });
};

// Handle Update Existing customer
exports.existingcustomer = function (req, res) 
{
    customers.findById(req.params.customer_id, function (err, customer) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "Update Existing customer",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Update Existing customer
          customer.customerName = req.body.customerName ? req.body.customerName : customer.customerName;
          customer.customerType = req.body.customerType ? req.body.customerType : customer.customerType;
          customer.isTest = req.body.isTest ? req.body.isTest : customer.isTest;
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "Update Existing customer",
                    "associationObjType": "id",
                    "successMessgae": "Update Existing customer Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "Update Existing customer",
                        "associationObjType": "id",
                        "successMessgae": "Update Existing customer successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};



// Handle Save DB information of customer
exports.DBcustomer = function (req, res)
 {
    customers.findById(req.params.customer_id, function (err, customer) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "Save DB information of customer",
            "associationObjType": "id",
            "successMessgae": "custnomer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Save DB information of customer
        
          customer.dbConnection= {  "url": req.body.url,
          "username": req.body.username,
          "password": req.body.password}
        
         
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "Save DB information of customer",
                    "associationObjType": "id",
                    "successMessgae": "Save DB information of customer",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "Save DB information of customer",
                        "associationObjType": "id",
                        "successMessgae": "Save DB information of customer successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};




// Handle update logo image
exports.updateimglogo = function (req, res) {
    customers.findById(req.params.customer_id, function (err, customer) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "update logo image",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give update logo image
          var data = fs.readFileSync(req.body.logoImg);
          let base64 = data.toString('base64');
           // console.log(base64.substr(0,200));

            // Feed out string to a buffer and then put it in the database
            customer.logoImg =new Buffer(fs.readFileSync(req.body.logoImg)).toString("base64");
         
          
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "update logo image",
                    "associationObjType": "id,file stream",
                    "successMessgae": "update logo image Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "update logo image",
                        "associationObjType": "id,file stream",
                        "successMessgae": "update logo image successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};


// Handle Activate inactive customer
exports.activecustomer = function (req, res) 
{
    customers.findById(req.params.customer_id, function (err, customer) 
    {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "Activate inactive customer",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give permission 
            customer.isActive=true;
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "Activate inactive customer",
                    "associationObjType": "id",
                    "successMessgae": "Activate inactive customer Failure",
                    "errorCode": "500",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "Activate inactive customer",
                        "associationObjType": "id",
                        "successMessgae": "Activate inactive customer successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};



// Handle Inactivate active customer
exports.inactivecustomer = function (req, res) 
{
    customers.findById(req.params.customer_id, function (err, customer) 
    {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "Inactivate active customer",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give permission 
            customer.isActive=false;
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "Inactivate active customer",
                    "associationObjType": "id",
                    "successMessgae": "Inactivate active customer Failure",
                    "errorCode": "500",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "Inactivate active customer",
                        "associationObjType": "id",
                        "successMessgae": "Inactivate active customer successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};

// Handle Save contact info
exports.contactsave = function (req, res) 
{
    customers.findById(req.params.customer_id, function (err, customer) 
    {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.customer_id,
            "recordType": "customer",
            "operationType": "Save contact info",
            "associationObjType": "id",
            "successMessgae": "customer not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Save contact info
          customer.contact=req.body.contact;
        

         
             customer.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.customer_id,
                    "recordType": "customer",
                    "operationType": "Save contact info",
                    "associationObjType": "id",
                    "successMessgae": "Save contact info Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":customer._id,
                        "recordType": "customer",
                        "operationType": "Save contact info",
                        "associationObjType": "id",
                        "successMessgae": "Save contact info successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};
