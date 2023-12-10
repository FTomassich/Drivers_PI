
const initialState = {
    drivers : [],
    allDrivers: [],
    teams: []
}

function rootReducer (state=initialState, action){
switch(action.type){
    case 'GET_DRIVERS':
        return{
            ...state,
            drivers:action.payload,
            allDrivers: action.payload
        }

        case 'GET_TEAMS':
            return {
                ...state,
                teams: action.payload
            }

        case 'POST_DRIVER':
            return {
                ...state
            }

        case 'FILTER_BY_TEAM':
    const normalizedTeam = action.payload.toLowerCase();
    const filteredByTeam = state.allDrivers.filter(driver => {
        const teams = driver.teams || ''; // Si teams es undefined, lo establecemos como una cadena vacía
        return teams.split(',').some(team => team.trim().toLowerCase().includes(normalizedTeam));
    });
    return {
        ...state,
        drivers: filteredByTeam,
    };

       

     

        case 'ORDER_BY_AGE':
            let sortedDrivers = state.drivers.slice(); // Hacer una copia del array
            sortedDrivers.sort((a, b) => {
              const dateA = new Date(a.fecha_de_nacimiento);
              const dateB = new Date(b.fecha_de_nacimiento);
          
              return action.payload === 'asc' ? dateA - dateB : dateB - dateA;
            });
          
            return {
              ...state,
              drivers: sortedDrivers,
          };


            case 'ORDER_BY_NAME':
                let sortedArr = [...state.drivers]; // Crear una copia del array
                sortedArr.sort(function(a, b) {
                    const fullNameA = `${a.nombre} ${a.apellido}`;
                    const fullNameB = `${b.nombre} ${b.apellido}`;
            
                    if (action.payload === 'asc') {
                        return fullNameA.localeCompare(fullNameB);
                      } else {
                        return fullNameB.localeCompare(fullNameA);
                      }
                    });
            
                return {
                    ...state,
                    drivers: sortedArr,
                };

                case 'FILTER_ORIGIN':
                    const originFilter = action.payload === 'created' ? state.allDrivers.filter(el => el.createdInDb) : state.allDrivers.filter(el => !el.createdInDb);
                    return {
                        ...state,
                        drivers: originFilter,
                    };




                case 'GET_NAME_DRIVERS':

    
                return {
                    ...state,
                    drivers: action.payload
                }

       


        default:
            return state;


            

            
}

}

export default rootReducer;