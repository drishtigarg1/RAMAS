import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, index: true },
    invoiceNumber: { type: String, unique: true, sparse: true, index: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine2: { type: String, default: "" },
      state: { type: String, default: "" },
      landmark: { type: String, default: "" },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Refunded"],
      default: "Pending"
    },
    statusHistory: [{ status: String, message: String, changedAt: { type: Date, default: Date.now } }],
    tracking: { courier: String, trackingNumber: String, trackingUrl: String, shippedAt: Date, expectedDelivery: Date },
    cancellation: { reason: String, cancelledAt: Date },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("validate", async function (next) {
  if (!this.orderNumber) {
    const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `RAM-${stamp}-${String(count + 1).padStart(6, "0")}`;
  }
  if (!this.statusHistory?.length) this.statusHistory = [{ status: this.status, message: "Order placed" }];
  next();
});

export default mongoose.model("Order", orderSchema);
