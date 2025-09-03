const mongoose = require('mongoose');

// OrderItem subdocument schema
const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    subtotal: {
        type: Number,
        required: true
    }
}, { _id: true });

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        unique: true,
        default: 1,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    customerName: {
        type: String,
        required: true
    },
    items: [orderItemSchema],
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    tax: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'mobile'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    notes: {
        type: String,
        maxlength: 500
    }
}, {
    timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await this.constructor.countDocuments({
            createdAt: {
                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            }
        });
        this.orderNumber = `ORD-${dateStr}-${String(count + 1).padStart(3, '0')}`;
    }
    next();
});

// Calculate totals before saving
orderSchema.pre('save', function() {
    this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    this.total = this.subtotal + this.tax - this.discount;
});

module.exports = mongoose.model('Order', orderSchema);