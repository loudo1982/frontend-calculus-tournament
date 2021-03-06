import React from 'react';
import Layout from '../components/Layout';
import {gql,useQuery} from '@apollo/client';

import Header from '../components/Header'

const OBTENER_EQUIPOS=gql`
query ObtenerEquiposMutation {
    obtenerEquipos {
        id
      NombreEquipo
      Escuela
      joueur1 {
        
        nombre
        email
        matricula
      }
      joueur2 {
        nombre
        email
        matricula
      }
      joueur3 {
        nombre
        email
        matricula
      }
      joueur4 {
        nombre
        email
        matricula
      }
      coach {
        nombre
        email
        matricula
      }
    }
  }`

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
const Equipos = () => {

    
    const {data, loading,error}=useQuery(OBTENER_EQUIPOS)
    

    console.log('los equipos son',data)
    console.log(loading)

    console.log(error)

    if(loading) return <div className="text-white">Cargando...</div>
    if(!data) return <div className="text-white">Cargando...</div>
    
   
    return (
       
       
           
            <Layout>
           
           <h1 className="  text-center text-white text-3xl"> Los equipos</h1>

           <h1 className="  text-center text-white text-3xl"> {`¡Quedan ${32-data.obtenerEquipos.length} lugares!`}</h1>




           <table className="border-collapse w-full">
    <thead>
        <tr>  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"># </th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Nombre del equipo </th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Prepa tec </th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 1</th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 2</th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 3</th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 4</th>
                   <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Coach</th>
                  
            

           
        </tr>
    </thead>
           <tbody className="bg-white">
               {data.obtenerEquipos.map((equipo,i)=>(
                 
                   
                   
                   <tr key={equipo.id} className="bg-gray-300 lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">#</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {i+1} </p>
                       </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static ml">
                        <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Nombre equipo:</span>
                          <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.NombreEquipo}</p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Escuela:</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.Escuela} </p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Juagador 1:</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.joueur1.nombre}</p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Jugador 2</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.joueur2.nombre} </p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Juagdor 3:</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.joueur3.nombre} </p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Jugador 4:</span>
                       <p className="ml-20 md:ml-2 lg:ml-2"> {equipo.joueur4.nombre} </p>
                       </td>
                       <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                       <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Coach:</span>
                       <p className="ml-20 md:ml-2 lg:ml-2">{equipo.coach.nombre} </p>
                       </td>
                       
                       </tr>
               ))}

           </tbody></table>
            </Layout>
       
    );
};

export default Equipos;