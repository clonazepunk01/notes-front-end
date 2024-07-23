import React, { useEffect, useRef, useState } from "react";
import ItemNotas from "./ItemNotas";
import { v4 as uuid } from 'uuid';

export default function ListaNotas() {
    
    // Hook useState permite rastrear el estado de un componente (datos o propiedades
    // guardados en el estado)
    // const [<propiedad>, set<propiedad>] = useState(<estado_inicial>)
    const [descripcion, notas, setNotas] = useState([]);

    // Hook useRef permite conservar valores entre renderizaciones. Se asocia usualmente
    // a la entrada de usuario en controles input
    // const <referencia> = useRef()
    const notaRef = useRef();
    const descRef = useRef();

    // Hook useEffect permite realizar efectos secundarios en un componente (obtener datos,
    // actualizar DOM, establecer un temporizador)
    // useEffect(<funcion_efecto>, <condicion_dependencia>)
    useEffect(
        () => {
            // recuperar datos desde el Local Storage
            const listaNotas = JSON.parse(localStorage.getItem("notas-app-lista"));
            if (listaNotas){
                setNotas(listaNotas);
            }
        },
        []
    );

    useEffect(
        () => {
            // almacenar datos en el Local Storage cuando cambie el estado 'tareas'
            const json = JSON.stringify(notas, descripcion);
            console.log(json);
            localStorage.setItem("descripcion-app-lista", "notas-app-lista", json);
        },
        [notas]
    );

    const agregarNota = () => {
        const nota = notaRef.current.value;
        if (nota == "") return;
        const nuevaNota = {
            id:uuid(),
            nota:notaRef.current.value
        };
        setNotas( (prev) => {
            // operador spread (...) expande un iterable en mas elementos
            return [...prev, nuevaNota]
        });
    }

    return (
        <div class="container p-5 bg-light rounded shadow-lg mt-5">
            <h2>Listado de Notas</h2>
            <form id= "formulario" method= "post">
            <div className="input-group mb-3"> 
                <input ref={notaRef} className="form-control" placeholder="Ingrese un Título"></input>
                <input className= "form-control" placeholder= "Descripcion "></input>
            </div>  
            <div className="input-group mb-3">
            <button onClick={agregarNota} className="btn btn-primary">Agregar</button>
            </div>
            </form>



            <ul className="list-group">
                { notas.map( (item) => ( <ItemNotas key={item.id} nota={item.nota}></ItemNotas>) )}
            </ul>
        </div>
    )
} 