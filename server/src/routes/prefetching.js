const axios = require ('axios');
const {Drivers, Teams} = require ('../db');

const getApiInfo = async () => {
    const apiURL = await axios.get ('http://localhost:5000/drivers');
    const apiInfo = await apiURL.data.map (el => {
        return {
            id: el.id,
            nombre: el.name.forename,
            apellido: el.name.surname,
            nacionalidad: el.nationality,
            fecha_de_nacimiento: el.dob,
            descripcion: el.description,
            imagen: el.image.url,
            teams: el.teams,

        }
    })
    return apiInfo;

};

const getDbInfo = async () => {
    const driversFromDb = await Drivers.findAll ({
        include : {
            model: Teams,
            attributes : ['nombre'],
            through: { 
                attributes: [],
            },
            }
    });
    const driversFormatted = driversFromDb.map((driver) => {
        // Mapea los conductores y transforma los equipos en una cadena de strings
        const teamsAsString = driver.Teams.map((team) => team.nombre).join(', ');
        return {
          id: driver.id,
          nombre: driver.nombre,
          apellido: driver.apellido,
          descripcion: driver.descripcion,
          imagen: driver.imagen,
          nacionalidad: driver.nacionalidad,
          fecha_de_nacimiento: driver.fecha_de_nacimiento,
          createdInDb: driver.createdInDb,
          teams: teamsAsString, // Convierte la matriz de objetos en una cadena
        };
      });
    
      return driversFormatted;

}

const getAllDrivers = async () => {
    const apiInfo = await getApiInfo ();
    const dbInfo = await getDbInfo ();
    const totalDrivers = apiInfo.concat(dbInfo);
    return totalDrivers;
};

module.exports = { getApiInfo, getDbInfo, getAllDrivers } ;