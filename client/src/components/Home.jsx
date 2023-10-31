import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCharacters } from '../actions';
import {Link} from 'react-router-dom';


const Home = () => {

const dispatch=useDispatch()
const AllCharacters=useSelector((state)=> state.characters)

useEffect(()=>{
    dispatch (getCharacters());
},[])

  return (
    <div>

      <Link to= '/driver'>Crear Driver</Link>


    </div>
  )
}

export default Home