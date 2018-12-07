module.exports = (sequelize, Sequelize) => {
    const CreatedCharge = sequelize.define('created_charge', {
        code: {
            type: Sequelize.STRING
        },
        ChargeCreatedAt: {
            type: Sequelize.STRING
        }    
      });
      return CreatedCharge;

}