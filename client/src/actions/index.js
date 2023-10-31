import axios from 'axios';

export function getCharacters() {

return async function (dispatch){
    var json= await axios.get ("http://localhost:3001/drivers");
    return dispatch({
        type: 'GET_DRIVERS',
        payload: json.data
    })
}


}