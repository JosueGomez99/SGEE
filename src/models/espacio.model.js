const { Model, DataTypes } = require("sequelize");

const ESPACIO_TABLE = "espacios";

class espacio extends Model {
  static associate(models) {
    this.belongsTo(models.sotanos, {
      foreignKey: "id_sotano",
      as: "sotano",
    });

    this.belongsTo(models.estado_espacio, {
      foreignKey: "id_estado_espacio",
      as: "estado_espacio",
    });

    this.hasMany(models.asignacionInstitucionEspacio, {
      foreignKey: "id_espacio",
      as: "asignacionesInstitucion",
    });

    this.hasMany(models.asignacionFuncionarioEspacio, {
      foreignKey: "id_espacio",
      as: "asignacionesFuncionario",
    });

   this.belongsTo(models.TipoEspacio, {
      foreignKey: 'id_tipo_espacio',
      as: 'tipo_espacio'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESPACIO_TABLE,
      modelName: "espacio",
      timestamps: false,
    };
  }
}

const espacioSchema = {
  id_espacio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  //S+IDSOTANO-IDESPACIO = S1-1
  codigo: {
    allowNull: true,
    unique: true,
    type: DataTypes.STRING(10),
  },
  //Ese el Alias del uauario
  numero: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(10),
  },
  //nombre
  id_sotano: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  //nombre_estado
  id_estado_espacio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  // nombre_tipoespacio
  id_tipo_espacio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  

};

module.exports = { espacio, espacioSchema };
