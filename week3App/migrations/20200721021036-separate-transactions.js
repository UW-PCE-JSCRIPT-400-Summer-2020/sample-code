module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('users').find({}, { userId: 1, transactions: 1})
      .forEach((user, callback) => {
        const { transactions, userId } = user;
        transactions.forEach(transaction => {
          transaction.userId = userId;
        });
        if (transactions.length > 0) {
          db.collection('transactions').insertMany(transactions).then(callback);
        }
      });
    await db.collection('users')
      .update({}, { $unset: { transactions: true } }, { multi: true }); 
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
