const Transaction = require('../models/transaction');
const mongoose = require('mongoose');


module.exports = {};

module.exports.getAll = (userId, page, perPage) => {
  return Transaction.find({ userId }).limit(perPage).skip(perPage*page).lean();
}

module.exports.getById = async (userId, transactionId) => {
  const results = await Transaction.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(transactionId), userId  }},
    { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "userId",
      as: "user"
    }},
    { $unwind: "$user" }
  ]);
  return results[0]
}

module.exports.deleteById = (userId, transactionId) => {
  return Transaction.deleteOne({ _id: transactionId, userId });
}

module.exports.updateById = (userId, transactionId, newObj) => {
  return Transaction.update({ _id: transactionId, userId }, newObj);
}

module.exports.create = (transactionData) => {
  return Transaction.create(transactionData);
}

module.exports.getStats = (userId, start, end) => {
  return Transaction.aggregate([
    { $match: { userId }},
    { $group: { _id: "$userId", count: { $sum: 1 }, sum: { $sum: "$charge" }}},
    { $project: { _id: 0, userId: "$_id", count: 1, sum: 1 }}
  ]);
}