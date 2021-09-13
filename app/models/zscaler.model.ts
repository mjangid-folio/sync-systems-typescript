module.exports = (sequelize, Sequelize) => {
  const Computer = sequelize.define("computer", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  ip: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  group_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
}); 

  return Computer;
};


// module.exports = (sequelize, Sequelize) => {
//   const Policy = sequelize.define("policy", {
//       id: {
//           type: Sequelize.UUID,
//           primaryKey: true,
//           allowNull: false
//         },
//     computer_name: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true
//     },
//     allowed_ip: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true
//     },
//     type: {
//       type: Sequelize.ENUM('computer_policy', 'internal_policy'),
//       allowNull: false
//     },
//   });

//   return Policy;
// };