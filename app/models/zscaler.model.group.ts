module.exports = function (sequelize, Sequelize) {
  const Computer_group = sequelize.define("computer_group", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
  });

  //   Computer.belongsTo(Computer_group, {foreignKey: 'group_id'}) // foreign key
  return Computer_group;
};