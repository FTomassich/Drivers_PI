import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import {postDriver, getTeams} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import style from '../CreateDriver/CreateDriver.module.css';


export default function CreateDriver(){
    const dispatch = useDispatch()
    // const history=useHistory
    const teams = useSelector ((state)=> state.teams) //el use selector apunta al estado "teams" del reducer

    const [input, setInput] = useState({          //creo un estado para guardar el form
        nombre: "",
        apellido: "",
        descripcion: "",
        imagen: "",
        nacionalidad: "",
        fecha_de_nacimiento: "",
        teams: []

    })

    

    function handleChange (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value

        })
        console.log (input)
    }
    //Manejo del select
    function handleSelect(e){
        setInput({
            ...input,
            teams: [...input.teams, e.target.value]

        })
    }

    //Manejo del Submit (botón)
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDriver(input))
        alert("Driver creado con éxito!!!")
        setInput({
            nombre: "",
        apellido: "",
        descripcion: "",
        imagen: "",
        nacionalidad: "",
        fecha_de_nacimiento: "",
        teams: []
        })
        history.push ('/home')

    }


   //Cuando se monta el componente me trae todos los teams de la DB
    useEffect(() => {
        dispatch (getTeams());
    }, [dispatch]);


    



    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1 className={style.titulo}> Creá tu Driver! </h1>

            <div className={style.formContainer}>

            <form
            onSubmit = {(e)=> handleSubmit(e)}>
                <div className={style.text}>Nombre</div>
                <div className={style.option}>

                        {/* <label className={style.label}>Nombre:</label> */}
                        
                    <input 
                    className={style.input}
                    type= "text"
                    value= {input.nombre}
                    name="nombre"
                    onChange={(e)=>handleChange(e)}
                    />
                    </div>
                    <div className={style.text}>Apellido</div>


                    <div className={style.option}>
                
                {/* <label className={style.label}>Apellido:</label> */}
                    <input className={style.input} 
                    type= "text"
                    value= {input.apellido}
                    name = "apellido"
                    onChange={(e)=>handleChange(e)}
                    />
                    </div>
                    <div className={style.text}>Descripcion</div>
                <div className={style.option}>
                {/* <label className={style.label}>Descripción:</label> */}
                    <input 
                    className={style.input} 
                    type= "text"
                    value= {input.descripcion}
                    name = "descripcion"
                    onChange={(e)=>handleChange(e)}
                    />
                    </div>
                    <div className={style.text}>URL de imágen</div>
                    <div className={style.option}>
                {/* <label className={style.label}>Imágen:</label> */}
                    <input className={style.input}
                    type= "text"
                    value= {input.imagen}
                    name = "imagen"
                    onChange={(e)=>handleChange(e)}
                    />
</div>
<div className={style.text}>Nacionalidad</div>
<div className={style.option}>
                {/* <label className={style.label}>Nacionalidad:</label> */}
                    <input className={style.input}
                    type= "text"
                    value= {input.nacionalidad}
                    name = "nacionalidad"
                    onChange={(e)=>handleChange(e)}
                    />
</div>
<div className={style.text}>Fecha</div>
<div className={style.option}>
    
                {/* <label className={style.label}>Fecha de nacimiento:</label> */}
                    <input className={style.input}
                    type= "text"
                    value= {input.fecha_de_nacimiento}
                     name = "fecha_de_nacimiento"
                     onChange={(e)=>handleChange(e)}
                    />
                    </div>

                    <div className={style.text}>Equipos</div>
                    <div className={style.option}>
                
          {/* <label className={style.label}>Equipos:</label> */}
          
          <select className={style.input}
          onChange={(e)=>handleSelect(e)}>
            {teams.map((team)=>{
                return(
                <option value={team.nombre}>{team.nombre}</option>
            );
                })}
          </select>
          </div>
          <ul><li>{input.teams.map(el=>el+ " ,")}</li></ul>
          <button type='submit'
          className={style.button}>Crear Driver</button>

        
        </form>

        </div>
        </div>

    );




}