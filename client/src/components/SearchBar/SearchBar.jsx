
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDrivers, filterDriversByTeams } from '../../actions';


const SearchBar = () => {
    const dispatch=useDispatch()
    const [name, setName]= useState("");
    const [team, setTeam]= useState("");


function handleInputChange(e){
    e.preventDefault();
    const value= e.target.value;
    setName(value);
    setTeam(value);

}



function handleNameSubmit(e){
    e.preventDefault()
    dispatch(getNameDrivers(name))
}

function handleTeamSubmit(e){
  e.preventDefault();
  dispatch(filterDriversByTeams(team));
}

  return (
    <div>SearchBar
        <input 
        type="text" 
        placeholder='Buscar Driver...'
        onChange={(e)=>handleInputChange(e)}
        />
        <button type='submit' onClick={(e)=> handleNameSubmit(e)}>Buscar por nombre</button>
        <button type='submit' onClick={(e)=>handleTeamSubmit(e)}>Buscar por Escudería</button>

    </div>
  )
}

export default SearchBar;