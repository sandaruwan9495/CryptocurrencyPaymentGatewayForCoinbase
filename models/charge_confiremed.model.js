module.exports = (sequelize, Sequelize) => {
    const ConfiremedCharge = sequelize.define('confiremed_charge', {
        code: {
            type: Sequelize.STRING
        },
        chargeConfiremedAt: {
            type: Sequelize.STRING
        },
        transactionId: {
            type: Sequelize.STRING
        },
        transferedAmount: {
            type: Sequelize.FLOAT
        },
        transferedCoinUnit: {
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
      return ConfiremedCharge;

}