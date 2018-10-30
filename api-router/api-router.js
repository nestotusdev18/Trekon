// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
const userController = require('../controllers/users');
const customerController=require('../controllers/customer');
// Contact routes
router.route('/users')
    .get(userController.index);

    router.route('/customers')
    .get(customerController.index);
  
    // singleCustomer

   router.route('/customer/one/:customer_id')
    .get(customerController.singleCustomer);


    router.route('/customer/add')
    .post(customerController.new);


    router.route('/customer/save/:customer_id')
    .put(customerController.existingcustomer)
    .patch(customerController.existingcustomer);


    router.route('/customer/activate/:customer_id')
    .put(customerController.activecustomer)
    .patch(customerController.activecustomer);

    router.route('/customer/inactivate/:customer_id')
    .put(customerController.inactivecustomer)
    .patch(customerController.inactivecustomer);

    router.route('/customer/contact/save/:customer_id')
    .put(customerController.contactsave)
    .patch(customerController.contactsave);

    router.route('/customer/db/save/:customer_id')
    .put(customerController.DBcustomer)
    .patch(customerController.DBcustomer);


    router.route('/customer/logo/upload/:customer_id')
    .put(customerController.updateimglogo)
    .patch(customerController.updateimglogo);



    router.route('/user/add').post(userController.new);
   
    router.route('/user/login').post(userController.loginlocal);
    router.route('/user/profile').get(userController.profile);

    router.route('/user/save/:user_id')
    .put(userController.existinguser)
    .patch(userController.existinguser);

    
    router.route('/user/auth/save/:user_id')
    .put(userController.auth)
    .patch(userController.auth);
    
    router.route('/user/logo/upload/:user_id')
    .put(userController.updateimgprofile)
    .patch(userController.updateimgprofile);

    router.route('/superuser/assign/:user_id')
    .put(userController.assignuser)
    .patch(userController.assignuser);

    router.route('/superuser/unassign/:user_id')
    .put(userController.unassignuser)
    .patch(userController.unassignuser);

    router.route('/user/contact/save/:user_id')
    .put(userController.contactsave)
    .patch(userController.contactsave);

     router.route('/user/customer/grant/:user_id')
     .put(userController.addgrant)
     .patch(userController.addgrant);
    router.route('/user/customer/remove/:user_id/:associatedCustomers_id')
    .put(userController.removegrant)
    .patch(userController.removegrant);
    // router.route('/users/:user_id').patch(userController.update)
    // .put(userController.update)
    // .delete(userController.delete);
// Export API routes
module.exports = router;