const OrderModel = require("../models/OrderModel");

module.exports.list = function list(req, res) {
    OrderModel.find().exec()
        .then((orders) => {
            return res.json(orders);
        });
    
}
module.exports.show = function show(req, res) {
    OrderModel.findById(req.params.id).exec()
        .then((orders) => {
            return res.json(orders);
        });
}
module.exports.create = function create(req, res) {
    const order = new OrderModel(req.body);
    order.save().then(newOrder => {
        res.json(newOrder);
    });
}