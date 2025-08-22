const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const faxes = sequelize.define(
    'faxes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

sender: {
        type: DataTypes.TEXT,

      },

receiver: {
        type: DataTypes.TEXT,

      },

summary: {
        type: DataTypes.TEXT,

      },

document_type: {
        type: DataTypes.ENUM,

        values: [

"medical",

"legal",

"financial",

"other"

        ],

      },

urgent: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

received_at: {
        type: DataTypes.DATE,

      },

processed_at: {
        type: DataTypes.DATE,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  faxes.associate = (db) => {

    db.faxes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.faxes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return faxes;
};

