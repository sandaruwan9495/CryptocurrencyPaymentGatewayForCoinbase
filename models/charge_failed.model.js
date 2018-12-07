module.exports = (sequelize, Sequelize) => {
    const FailedCharge = sequelize.define('failed_charge', {
        code: {
            type: Sequelize.STRING
        },
        ChargeExpiredAt: {
            type: Sequelize.STRING
        }    
      });
      return FailedCharge;
}