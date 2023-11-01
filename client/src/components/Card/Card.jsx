import React from 'react'

const Card = ({imagen, nombre, teams}) => {
  return (
    <div>
        <img src={imagen} alt="img not found" width="200px" height="250px" />

        <h3>{nombre}</h3>

        <h3>{teams}</h3>


    </div>
  )
}

export default Card