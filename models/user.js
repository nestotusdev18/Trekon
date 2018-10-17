// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var user = mongoose.Schema({
	firstName: {
		type: 'String'
	},
	lastName: {
		type: 'String'
	},
	middleName: {
		type: 'String'
	},
	isSuperAdmin: {
		type: 'Boolean', default: false
	},
	profileImg: {
		type: 'String'
	},
	credential: {
		login: {
			type: 'String'
		},
		password: {
			type: 'String'
		},
		auth: {
			type: 'String'
		},
		authToken: {
			type: 'String'
		}
	},
	associatedCustomers: {
		type: [{
            customerId: {
                type: 'String'
            },
            granted: {
                type: 'Date'
            },
            removed: {
                type: 'Date'
            },
            isActive: {
                type: 'Boolean'
            }
        }]
	},
	contact: {
		preferredName: {
			type: 'String'
		},
		phone: {
			type: [
				'String'
			]
		},
		email: {
			type: [
				'String'
			]
		},
		address: {
			address1: {
				type: 'String'
			},
			address2: {
				type: 'String'
			},
			city: {
				type: 'String'
			},
			state: {
				type: 'String'
			},
			zip: {
				type: 'Date'
			},
		}
	}
});

// Export Contact model
var users = module.exports = mongoose.model('users', user);
module.exports.get = function (callback, limit) {
    users.find(callback).limit(limit);
}


