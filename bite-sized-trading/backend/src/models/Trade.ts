import { Schema, model } from 'mongoose';

const tradeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  symbol: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tradeDate: {
    type: Date,
    default: Date.now,
  },
  tradeType: {
    type: String,
    enum: ['buy', 'sell'],
    required: true,
  },
});

const Trade = model('Trade', tradeSchema);

export default Trade;