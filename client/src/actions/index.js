import axios from 'axios';

export function getDrivers() {

return async function (dispatch){
    var json= await axios.get ("http://localhost:3001/drivers");
    return dispatch({
        type: 'GET_DRIVERS',
        payload: json.data
    })
}
}
//Esta action me trae los teams del server
export function getTeams() {
    return async function (dispatch) {
        var info= await axios ("http://localhost:3001/teams", {});
        return dispatch ({ type: "GET_TEAMS", payload: info.data});
    };
}

export function postDriver(payload){
    return async function (dispatch) {
        const response= await axios.post('http://localhost:3001/drivers', payload);
        console.log(response)
        return response;
    }
}

// Filtrado por Escudería (team)
export function filterDriversByTeams (team){
    return {
        type: 'FILTER_BY_TEAM',
        payload: team
    }
}
 
//Filtrado por name (y apellido)
export function getNameDrivers(name){
    return async function (dispatch){
        try{
            var json=await axios.get ("http://localhost:3001/drivers?name=" + name);
            return dispatch ({
                type: "GET_NAME_DRIVERS",
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//Ordenamiento por fecha de nacimiento
export const orderByAge = (order) => {
    return {
      type: 'ORDER_BY_AGE',
      payload: order,
    };
  };

export function filterOrigin (payload){
    return{
        type: 'FILTER_ORIGIN',
        payload
    }
}

//Ordenamiento alfabético
export function orderByName(payload) {

    return {
        type: 'ORDER_BY_NAME',
        payload
    }

}



