module.exports = (sequelize, Sequelize) => {
    const Charge = sequelize.define('charge', {  
        code: {
            type: Sequelize.STRING
        },
        productName: {
            type: Sequelize.STRING
        },
        hostedUrl: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        ChargeCreateAt: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        priceUnit: {
            type: Sequelize.STRING
        },
        pricingType: {
            type: Sequelize.STRING
        }
        
      });
      return Charge;
}
