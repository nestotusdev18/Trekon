// customer.js
const mongoose = require('mongoose');
// Setup schema
const Customers = mongoose.Schema(
{
	customerName: {
		type: 'String'
	},
	customerType: {
		type: 'String'
	},
	isTest: {
		type: 'Boolean', default: true
	},
	isActive: {
		type: 'Boolean', default: false
	},
	logoImg: {
		type: 'String'
	},
	dbConnection: {
		url: {
			type: 'String'
		},
		username: {
			type: 'String'
		},
		password: {
			type: 'String'
		}
	},
	contact: {
		personName: {
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
			}
		}
	}
});
const customers = module.exports = mongoose.model('customers', Customers);
module.exports.get = function (callback, limit) {
    customers.find(callback).limit(limit);
}
