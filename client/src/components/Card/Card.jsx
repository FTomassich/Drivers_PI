import React from 'react'
import style from '../Card/Card.module.css';
const Card = ({imagen, nombre, apellido, teams, fecha_de_nacimiento}) => {
  return (
    <div className={style.card}>
        <img className={style.imagen}src={imagen} alt="img not found" />

        <h2 className={style.nombre}>Nombre: {nombre} {apellido}</h2>

        <h3 className={style.nombre}>Fecha de Nacimiento: {fecha_de_nacimiento}</h3>

        <h3 className={style.escuderias}>Escuderías: {teams}</h3>


    </div>
  )
}

export default Card