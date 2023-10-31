
const initialState = {
    drivers : []
}

function rootReducer (state=initialState, action){
switch(action.type){
    case 'GET_DRIVERS':
        return{
            ...state,
            characters:action.payload
        }
}
}

export default rootReducer;