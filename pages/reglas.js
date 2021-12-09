import React,{useEffect, useState} from 'react';
import Layout from '../components/Layout'
import {useQuery ,gql} from '@apollo/client';

const OBTENER_USUARIO= gql`
query Query {
    obtenerUsuario {
      id
      nombre
      apellido
      email
      matricula
      role
      creado
    }
  }`
  ;
  
const Reglas = () => {
  

    const[rolee,setRole]=useState('okok')

   
   
    

       
        const {data,loading,error}=useQuery(OBTENER_USUARIO)
        console.log('los datas son',data)
        if(loading) return <div className="text-white">Cargando...</div>;
      
        if(!data) return <h1>Te invito a conectarte</h1>        
         
      
      

    
  
   
    

    

    return (
        <div>
          <Layout>
          <h1 className="text-4xl font-normal leading-normal mt-6 mb-2 text-white text-center underline">
  Reglas del Torneo de cultura general
</h1>
            
         {/*  {data.obtenerUsuario?<h1>{`Tu role es: ${data.obtenerUsuario.role}`} </h1>:'Te invitamos a conectarte'}
           {data.obtenerUsuario===null && <div> Te invitamos a conectarte</div> } 
           {data.obtenerUsuario? data.obtenerUsuario.role==='admin'&& <div onClick={()=>console.log('clique admin')}>Je suis admin </div>:<div>conectate</div> } 
           {data.obtenerUsuario? data.obtenerUsuario.role==='user'&& <div>Je suis user </div>:<div>Je ne suis rien</div> } 
           */}
           <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
           Reglas en las partidas:
</h1>

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-400 border-2 border-red-700 ">
En cada breakout room jugarán 2 equipos. Cada equipo estará integrado por 4 jugadores. En cada partida se responderá a un total de 20 preguntas clasificadas por área de conocimiento: historia, geografía, arte, deporte y ciencia, con una duración máxima por respuesta de 5 segundos. 


</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-400 border-2 border-red-700 ">
Antes de cada pregunta, el coach asignado declarará el área de conocimiento al que la pregunta pertenece. En seguida, cada equipo elegirá al representante que considere más apto para responder según el área. El coach hará la pregunta y ambos representantes tendrán un máximo de 5 segundos para responderla. El turno para responder se otorgará al primero de los representantes que escriba “yo” en el chat de la sesión. Si la respuesta de este representante es errónea, se cederá el turno al oponente. El coach asignado registrará las respuestas correctas de cada equipo para avanzar en el torneo. 
</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-400 border-2 border-red-700 ">
Si el coach considera que algún equipo realiza consultas durante la sesión en internet o en alguna otra fuente, el equipo podrá ser descalificado.
</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-400 border-2 border-red-700 ">
Cada uno de los integrantes del equipo tiene que tener su cámara encendida.

</p>

            
            </Layout>
        </div>
    );
};

export default Reglas;