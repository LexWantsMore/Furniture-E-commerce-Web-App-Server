const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
  {
    userId: String,
    cost: String,
    product: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Transaction', TransactionSchema);
