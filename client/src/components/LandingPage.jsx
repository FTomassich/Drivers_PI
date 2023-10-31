import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        
        <h1>🏎️Drivers F1 App🏎️</h1>
        <h3>created by Franco Tomassich 🚀</h3>

        <Link to= "/home">
        <button>Ingresar</button>
        </Link>

    </div>
  )
}

export default LandingPage