const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Drivers",
    {
      id: {
        type: DataTypes.UUID,    //para evitar conflictos con los ID
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_de_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
//creo una prop para acceder más fácilmente a los creados en mi db
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }


      
    },{
      
      timestamps: false, // Esto evita que se creen createdAt y updatedAt
    }
    
  );
};