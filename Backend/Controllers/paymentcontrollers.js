const Razorpay = require("razorpay")
//step-1 instantiate razorpay
var instance = new Razorpay({
    key_id: 'rzp_test_kCyirXhSlfREHP',
    key_secret: 'kWy3zG4iUzdEVOGMC2r2ZViL',
});


//step-2 integrating order id
async function create_orderId(req, res) {
    //console.log("create orderId request", req.body)
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
    };
    instance.orders.create(options, function (err, order) {
        //console.log(order);
        res.send({ orderId: order.id })//send response to checkout
    });
}

//last step verifying the payment
async function verify_payment(req, res) {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'kWy3zG4iUzdEVOGMC2r2ZViL')
        .update(body.toString())
        .digest('hex');
    //console.log("sig received ", req.body.response.razorpay_signature);
    //console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.send(response);
}

module.exports = { create_orderId, verify_payment }