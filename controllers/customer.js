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
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Customers retrieved successfully",
            data: customer
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
exports.existingcustomer = function (req, res) {
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
          customer.logoImg = fs.readFileSync(req.body.logoImg);
          
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