import React from 'react'
import style from '../Home/Home.module.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { filterOrigin, getDrivers, orderByName, orderByAge } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';

const Home = () => {

const dispatch=useDispatch()
const allDrivers=useSelector((state)=> state.drivers)
const [orden, setOrden]=useState('')
//Estados locales del paginado
const [currentPage, setCurrentPage]=useState(1)
const [driversPerPage, setDriversPerPage]=useState(9)
const indexOfLastDriver = currentPage * driversPerPage //9
const indexOfFirstDriver = indexOfLastDriver - driversPerPage//0
const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver)

const paginado= (pageNumber)=> {
  setCurrentPage(pageNumber)
}

useEffect(()=>{
    dispatch (getDrivers());
},[]);


function handleClick(e){
  e.preventDefault();
  dispatch(getDrivers());
}

function handleOrderByAge(e) {
  e.preventDefault();
  const order = e.target.value; // Obtener el valor del select (asc o desc)
  dispatch(orderByAge(order));
}

function handleFilterOrigin(e){
  dispatch(filterOrigin(e.target.value))    //Le paso a la función lo que viene del select ( eso es el: e.target.value)
}

function handleSort(e){
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrden( `Ordenado ${e.target.value}`)
};

  return (
    <div>
      {/* <div className={style.titulo}>
      <h1 >🏁Formula 1 Drivers🏁</h1>
      </div> */}
        

      {/* <Link to= '/driver'>Crear Driver</Link> */}
    
      <button onClick={e=>{handleClick(e)}}>Volver a cargar todos los conductores</button>
      <div>

      <div>
      {/* Muestra el estado actual de la orden en algún lugar de la interfaz */}
      <p>{orden}</p>
    </div>

      <select onChange={e=>handleFilterOrigin(e)}>
          <h1>Filtrar según orígen</h1>
          <option disabled defaultValue>Filtrar según orígen</option>
          <option value="All">Todos</option>
          <option value="created">Creado en base de datos</option>
          <option value="api">Existente en Api</option>      
        </select>
        
        <select onChange={e=>handleSort(e)}>
        <option disabled defaultValue>Ordenar alfabéticamente</option>
          <option value="asc">Ascendente (A-Z)</option>
          <option value="desc">Descendente (Z-A)</option>
        </select>

        <select onChange={e=>handleOrderByAge(e)}>
        <option disabled defaultValue>Ordenar por Fecha de nacimiento</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        
          </div>    




        <div>
        <div><SearchBar/>
       </div>
       
        <div className= {style.containerCards}>

        {currentDrivers && currentDrivers.map((el)=>(
            <Card nombre={el.nombre} apellido={el.apellido} imagen={el.imagen} fecha_de_nacimiento={el.fecha_de_nacimiento} teams={el.teams} key={el.id}/>
          ))
        }
        </div>

      </div>
      <Paginado
        driversPerPage={driversPerPage}
        allDrivers={allDrivers.length}
        currentPage={currentPage}
        paginado={paginado}
        />

    </div>
    
  )
}

export default Home