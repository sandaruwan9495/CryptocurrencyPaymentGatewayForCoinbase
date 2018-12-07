module.exports = (sequelize, Sequelize) => {
    const PendingCharge = sequelize.define('pending_charge', {
        code: {
            type: Sequelize.STRING
        },
        chargePendingAt: {
            type: Sequelize.STRING
        },
        transactionId: {
            type: Sequelize.STRING
        },
        transactionAmount: {
            type: Sequelize.FLOAT
        },
        transactionCoinUnit: {
            type: Sequelize.STRING
        },
        blockNumber: {
            type: Sequelize.INTEGER
        },
        blockHash: {
            type: Sequelize.STRING
        },
        confirmationAccumilated: {
            type: Sequelize.INTEGER
        },
        confirmationRequired: {
            type: Sequelize.INTEGER
        }
        
      });
      return PendingCharge;

}