import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems:[
        {
            name:{type: String, required: true},
            qty:{type: Number, required:true},
            image:{type: String, required:true},
            price:{type:Number,required:true},
            product:{type:mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
        }
    ],
    shippingAddress:{
        address:{type:String, required: true},
        city:{type: String, required:true},
        country: { type:String, required:true },
        postalCode: {type:String, required:true}
    },
    paymentMethos:{
        type: String,
        required: true
    },
    paymentResult:{
        id:String,
        status:String,
        update_time:String,
        email_address:String
    },
    taxPrice:{
        type: Number,
        required: true,
        default:0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default:0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default:0.0
    },
    isPaid:{
        type: Boolean,
        required: true,
        default:false
    },
    isDeliverde:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: Date,
    deliveredAt: Date
},{
    timestamps: true
})

const Order = mongoose.model('Order',OrderSchema);

export default Order;