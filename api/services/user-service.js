const BaseService = require('./base-service');
const User = require('../models/User')

class UserService extends BaseService {
    async groupByMonth() {
        return User.aggregate([{
            $project: {
                month: {
                    $month: "$createdAt"
                }
            }
        }, {
            $group: {
                _id: "$month",
                total: {
                    $sum: 1
                }
            }
        }]);
    }
}

module.exports = new UserService(User);