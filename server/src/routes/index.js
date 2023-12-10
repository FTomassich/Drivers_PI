const { Router } = require("express");

const axios = require ('axios');
const { Drivers, Teams }= require ('../db');
const {getApiInfo, getDbInfo, getAllDrivers } = require ('./prefetching')

const router = Router();



// const getApiInfo= async () => {
//     const apiURL = await axios.get('http://localhost:5000/drivers');
//     const apiInfo=await apiURL.data.map(el => {
//         return {
//             id: el.id,
//             // número: el.number,
//             nombre: el.name.forename,
//             apellido: el.name.surname,
//             descripcion: el.description,
//             imagen: el.image.url,
//             nacionalidad: el.nationality,
//             fecha_de_nacimiento: el.dob, //STRING
//             teams: el.teams //STRING
//         }
//     })
//     return apiInfo;
// };


// const getDbInfo = async () => {
//     const driversFromDb = await Drivers.findAll({
//       include: {
//         model: Teams,
//         attributes: ['nombre'],
//         through: {
//           attributes: [],
//         },
//       }
//     });
  
//     const driversFormatted = driversFromDb.map((driver) => {
//       // Mapea los conductores y transforma los equipos en una cadena de strings
//       const teamsAsString = driver.Teams.map((team) => team.nombre).join(', ');
//       return {
//         id: driver.id,
//         nombre: driver.nombre,
//         apellido: driver.apellido,
//         descripcion: driver.descripcion,
//         imagen: driver.imagen,
//         nacionalidad: driver.nacionalidad,
//         fecha_de_nacimiento: driver.fecha_de_nacimiento,
//         createdInDb: driver.createdInDb,
//         teams: teamsAsString, // Convierte la matriz de objetos en una cadena
//       };
//     });
  
//     return driversFormatted;}





// const getAllDrivers= async ()=> {
//     let apiInfo= await getApiInfo();
//     const dbInfo= await getDbInfo();
//     const infoTotal= apiInfo.concat(dbInfo);
//     return infoTotal
// }

//Ruta Get Drivers + Get Driver By name *query

router.get ('/drivers', async (req, res)=> {
const name = req.query.name
let driversTotal= await getAllDrivers();
if (name){
    let driverName = await driversTotal.filter(el => (el.nombre + ' ' + el.apellido).toLowerCase().includes(name.toLowerCase())).slice(0, 15);
    driverName.length ?
 res.status(200).send(driverName) :
 res.status (404). send('No está el conductor');
}else {

    res.status (200).send (driversTotal);
}

});


//Ruta Get Drivers By Id
router.get ('/drivers/:idDriver', async (req, res)=>{
    const idDriver= req.params.idDriver;
    let driversTotal= await getAllDrivers();
    
   const driverById = await driversTotal.find(el=> el.id===(idDriver));
   if (driverById) {

    res.status (200).send (driverById);

   } else {
    res.status(404).send('No se encontró el conductor');
   }

   });



   router.get('/teams', async (req,res)=>{

    //Me traigo los teams de la Api    
    const teamsApi= await axios.get('http://localhost:5000/drivers') 
    apiData= teamsApi.data 
    const teams= apiData
    .map(el=>el.teams)
    .join(',')
    .split(',')
    .map (team=>team.trim());

//Para eliminar el duplicado de escuderías (Teams)
const uniqueTeams=[]
for (let team of teams){
    if (!uniqueTeams.includes(team)){
        uniqueTeams.push(team);
    }};

//Recorro el array de teams y por cada elemento creo un registro Teams
uniqueTeams.forEach(el=>{
    Teams.findOrCreate({
        where: {nombre:el} 
})
    })
const allTeams= await Teams.findAll();

res.send(allTeams);

   });

router.post('/drivers', async (req, res)=>{
 let {
        nombre,
        apellido,
        descripcion,
        imagen,
        nacionalidad,
        fecha_de_nacimiento,
        createdInDb,
        teams,  

 }= req.body;

 
 let driverCreated= await Drivers.create({
    nombre,
    apellido,
    descripcion,
    imagen,
    nacionalidad,
    fecha_de_nacimiento,
    createdInDb

 })
 
 let teamsDb= await Teams.findAll({
    where: {nombre : teams}
 })
driverCreated.addTeams(teamsDb)
res.send ('Driver creado con éxito')
})


module.exports = router;
