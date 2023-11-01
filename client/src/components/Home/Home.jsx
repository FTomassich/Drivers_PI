import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getDrivers } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';

const Home = () => {

const dispatch=useDispatch()
const allDrivers=useSelector((state)=> state.drivers)

useEffect(()=>{
    dispatch (getDrivers());
},[])


function handleClick(e){
  e.preventDefault();
  dispatch(getDrivers());
}

  return (
    <div>

      <Link to= '/driver'>Crear Driver</Link>
      <h1>🏎️Formula 1 Drivers🏎️</h1>
      <button onClick={handleClick}>Volver a cargar todos los conductores</button>
      <div>
        
        <select>
          <h3>Ordenar alfabéticamente</h3>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select>
          <h3>Ordenar por Fecha Nacimiento</h3>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>


        <select>
          <h3>Filtrar según orígen</h3>
          <option value="All"></option>
          <option value="created in DB">Creado en base de datos</option>
          <option value="Api">Existente en Api</option>      
        </select>

        <select>
          <h3>Filtrar por team</h3>
          <option value=''></option>     
        </select>
        {
          allDrivers && allDrivers.map((el)=>(
            <Card nombre={el.nombre} imagen={el.imagen.url} teams={el.teams} key={el.id}/>
          ))
        }
      </div>

    </div>
  )
}

export default Home