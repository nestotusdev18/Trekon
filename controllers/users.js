// user.js
// Import user model
var fs = require('fs');
const users = require('../models/user');
const passport=require("passport");
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
// Handle index actions
exports.index = function (req, res) {
    users.get(function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: user
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new users();
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
    user.middleName = req.body.middleName ? req.body.middleName : user.middleName;
  
// save the user and check for errors
user.save(function (err) {
        if (err)
           res.status(500).send({
    
            "isOperationSuccess": false,
            "recordId": "",
            "recordType": "user",
            "operationType": "Add",
            "associationObjType": "Profile Name",
            "successMessgae": "Profile Name  Added failure",
            "errorCode": "",
            "errorMessage": err
          
               
            });
res.status(200).send({
    
        "isOperationSuccess": true,
        "recordId": user._id,
        "recordType": "user",
        "operationType": "Add",
        "associationObjType": "Profile Name",
        "successMessgae": "Profile Name  Added successfully",
        "errorCode": "",
        "errorMessage": ""
      
           
        });
    });
};

// Handle Update Existing User
exports.existinguser = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Update Existing User",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Update Existing User
          user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
          user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
          user.middleName = req.body.middleName ? req.body.middleName : user.middleName;
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "Update Existing User",
                    "associationObjType": "id",
                    "successMessgae": "Update Existing User Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "Update Existing User",
                        "associationObjType": "id",
                        "successMessgae": "Update Existing User successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};

//passport local user
 exports.loginlocal=function(req, res, next){
    passport.authenticate('local', 
        {session: false},
        (err, user, info) => {

           // console.log(err);
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user   : user
                });
            }
    
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
    
                var token = jwt.sign({id: user._id}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
    
                return res.json({user, token});
            });
        })
        (req, res);
  };

/* GET user profile. */
exports.profile= function(req, res, next) {
    passport.authenticate('jwt', 
        {session: false},
        (err, user) => {

           
            if (err || !user) {
                return res.status(400).json({
                   
                    user   : user
                    ,
                    message: err
                });
            }
    
         
    
                return res.json({user});
            
        }) (req, res);
       
  };
 // Access Control
 function ensureAuthenticated(req,res){
   if(!req.headers['authorization'])
   return res.status(403).send({ auth: false, message: 'No token provided.' });
    var f =  req.headers['authorization'].split(' ');
   
 var token=f[1];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
     
     
    });
  
  }
// Handle auth User
exports.auth = function (req, res) {
   // ensureAuthenticated(req,res);
    users.findById(req.params.user_id, function (err, user) {
       
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Save Auth and Credentials",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Save Auth and Credentials
          let hastpwd='';
          user.credential={};
          if(req.body.auth=="normal")
          {
        const  login = req.body.login;
       const   password = req.body.password;
      
       
         hastpwd = bcrypt.hashSync(password, 10);
       
        user.credential={
            "login": login,
            "password": hastpwd,
            "auth": 'normal'
            
                    }; 
        }
          else
          {




          }
      
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":user._id,
                    "recordType": "user",
                    "operationType": "Save Auth and Credentials",
                    "associationObjType": "id",
                    "successMessgae": "Update Existing User Failure",   
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "Save Auth and Credentials",
                        "associationObjType": "id",
                        "successMessgae": "Save Auth and Credentials successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};





// Handle update profile image
exports.updateimgprofile = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "update profile image",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
            let imageFile=req.files.profileImg;
          //give update profile image
          user.profileImg =imageFile.data.toString("base64");
          user.profileImg =new Buffer(fs.readFileSync(req.body.profileImg)).toString("base64");
          
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "update profile image",
                    "associationObjType": "id,file stream",
                    "successMessgae": "update profile image Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "update profile image",
                        "associationObjType": "id,file stream",
                        "successMessgae": "update profile image successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};





// Handle Assign as SuperUser
exports.assignuser = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Assign as SuperUser",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give permission 
            user.isSuperAdmin=true;
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "Assign as SuperUser",
                    "associationObjType": "id",
                    "successMessgae": "Assigned as SuperUser Failure",
                    "errorCode": "500",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "Assign as SuperUser",
                        "associationObjType": "id",
                        "successMessgae": "Assigned as SuperUser successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};

// Handle add grant customer access for user
exports.addgrant = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "grant customer access for user",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give grant customer access for user
            user.associatedCustomers=req.body.associatedCustomers;
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "grant customer access for user",
                    "associationObjType": "id",
                    "successMessgae": "grant customer access for user Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "grant customer access for user",
                        "associationObjType": "id",
                        "successMessgae": "grant customer access for user successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};




// Handle remove grant customer access for user
exports.removegrant = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Remove grant customer access for user",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //invoke grant customer access for user
          
          user_id = user._id,
          associatedCustomers_id = req.params.associatedCustomers_id;
        
          users.findByIdAndUpdate(
            user_id,
         { $pull: { 'associatedCustomers': {  _id: associatedCustomers_id } } },function(err,user){
            if(err){
                
                 return  res.status(500).send({

                            "isOperationSuccess": false,
                            "recordId":user._id,
                            "recordType": "user",
                            "operationType": "Remove grant customer access for user",
                            "associationObjType": "id",
                            "successMessgae": "Remove grant customer access for user Failure",
                            "errorCode": "",
                            "errorMessage": err
                          
                               
                            });
              }
              return  res.status(200).send({

                            "isOperationSuccess": true,
                            "recordId":user._id,
                            "recordType": "user",
                            "operationType": "Remove grant customer access for user",
                            "associationObjType": "id",
                            "successMessgae": "Remove grant customer access for user successfully",
                            "errorCode": "",
                            "errorMessage": err
                          
                               
                            });
          });
        



           
       
    });
};






//   Handle Un Assign as SuperUser
exports.unassignuser = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Un Assign as SuperUser",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //revoke permission 
            user.isSuperAdmin=false;
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "Un Assign as SuperUser",
                    "associationObjType": "id",
                    "successMessgae": "Unassigned as SuperUser Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "Un Assign as SuperUser",
                        "associationObjType": "id",
                        "successMessgae": "Unassigned as SuperUser Successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};
// Handle Save contact info
exports.contactsave = function (req, res) {
    users.findById(req.params.user_id, function (err, user) {
        if (err)
        return  res.status(404).send({
    
            "isOperationSuccess": false,
            "recordId":req.params.user_id,
            "recordType": "user",
            "operationType": "Save contact info",
            "associationObjType": "id",
            "successMessgae": "User not Found",
            "errorCode": "",
            "errorMessage": err
          
               
            });
          
          //give Save contact info
          user.contact=req.body.contact;
        

         
             user.save(function (err) {
                 //fail
                if (err)
                return  res.status(500).send({
    
                    "isOperationSuccess": false,
                    "recordId":req.params.user_id,
                    "recordType": "user",
                    "operationType": "Save contact info",
                    "associationObjType": "id",
                    "successMessgae": "Save contact info Failure",
                    "errorCode": "",
                    "errorMessage": err
                  
                       
                    });

                    //successfull
                    return  res.status(200).send({
    
                        "isOperationSuccess": true,
                        "recordId":user._id,
                        "recordType": "user",
                        "operationType": "Save contact info",
                        "associationObjType": "id",
                        "successMessgae": "Save contact info successfully",
                        "errorCode": "",
                        "errorMessage": err
                      
                           
                        });
            });
       
    });
};
//Handle delete user
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};



// user.associatedCustomers.remove({
//     _id: req.body.associatedCustomers_id
// }, function (err, user) {
//     if (err)
//     return  res.status(500).send({

//         "isOperationSuccess": false,
//         "recordId":user._id,
//         "recordType": "user",
// "operationType": "Remove grant customer access for user",
// "associationObjType": "id",
// "successMessgae": "Remove grant customer access for user Failure",
//         "errorCode": "",
//         "errorMessage": err
      
           
//         });
//         return  res.status(200).send({

//             "isOperationSuccess": true,
//             "recordId":user._id,
//             "recordType": "user",
//             "operationType": "Remove grant customer access for user",
//             "associationObjType": "id",
//             "successMessgae": "Remove grant customer access for user successfully",
//             "errorCode": "",
//             "errorMessage": err
          
               
//             });
// });