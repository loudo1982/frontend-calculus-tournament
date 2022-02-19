import React, { useEffect, useState } from 'react';
import {useQuery ,gql} from '@apollo/client';
import{useRouter} from 'next/router';

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

const Header = () => {
  
    
    const router=useRouter()
    const {data,loading,error,client}=useQuery(OBTENER_USUARIO)

    const cerrarSesion =()=>{
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/')

    }
    
    console.log('los datas son',data)
    console.log(loading)
    console.log(error)
    if(loading || data.obtenerUsuario===null)
    return (
        
        <div className="flex justify-between m-3">
           
        <p className="mr-2 text-white">Bienvenido  </p>
        
       </div>)
    

    //proteger que no accedamos a data antes de teenr resultados

    

   const {nombre,role}= data.obtenerUsuario;
  
  
    return (
        <div className="flex justify-between m-3">
           

         <p className="mr-2 text-white">Bienvenido {nombre} </p>
         <button type="button"
         onClick={()=>cerrarSesion()}
         className="bg-gray-700 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">Cerrar sesión</button>
        </div>
    );
};

export default Header;