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
  
const Entrenamiento = () => {
  

    const[rolee,setRole]=useState('okok')

   
   
    

       
        const {data,loading,error}=useQuery(OBTENER_USUARIO)
        console.log('los datas son',data)
        if(loading) return <div className="text-white">Cargando...</div>;
      
        if(!data) return <h1>Te invito a conectarte</h1>        
         
      
      

    
  
   
    

    

    return (
        <div>
        <div >
          <Layout>
          <h1 className="text-4xl font-normal leading-normal mt-6 mb-2 text-white text-center underline">
  Ejercicios de entrenamiento
</h1>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-500 border-2 border-white ">
¡Ponemos a tu disposición una serie de ejercicios para que puedas entrenarte y trascender el día del torneo!
</p>
<div className="flex">
<div className=" flexNone bg-gray-300 mt-0 mb-4 ml-8  w-36 h-36 border-2 border-white text-center 
  ">
    Serie de ejercicios 1
    <a href="https://inflore.life/ejercicios.pdf" target="_blank" rel="noreferrer role="button">
    <svg className="w-16 h-16 ml-10 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
  </a></div>
  <div className=" flexNone bg-gray-300 mt-0 mb-4 ml-8  w-36 h-36 border-2 border-white text-center  ">
  Serie de ejercicios 2
  <svg className="w-16 h-16 ml-10 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
  </div>
  <div className="flexNone bg-gray-300 mt-0 mb-4 ml-8  w-36 h-36 border-2 border-white text-center ">
  Serie de ejercicios 3
  <svg className="w-16 h-16 ml-10 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
  
  </div>
  <div className="flexNone bg-gray-300 mt-0 mb-4 ml-8  w-36 h-36 border-2 border-white text-center ">
  Serie de ejercicios 4
  <svg className="w-16 h-16 ml-10 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
  
  </div>
  <div className="flexNone bg-gray-300 mt-0 mb-4 ml-8  w-36 h-36 border-2 border-white text-center " >
  Serie de ejercicios 5
  <svg className="w-16 h-16 ml-10 mt-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
  
  </div></div>
        

          
        
            
   

            
            </Layout>
        </div></div>
    );
};

export default Entrenamiento;
