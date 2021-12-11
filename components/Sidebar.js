import React,{useState} from 'react';
import Link from 'next/link';
import {useQuery,gql} from '@apollo/client';
import router from 'next/router';


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


const Sidebar = () => {

  
 


 
    const [active, setActive] = useState(false);
    const handleClick = () => {
        setActive(!active);
      };
     
      const {data,loading,error}=useQuery(OBTENER_USUARIO)
       
      if(loading) return <div className="text-white">Cargando la aplicación...</div>
      console.log('el usuario es',data)

      const deconnecter= ()=>{localStorage.removeItem('token');
     
      router.reload('/')
      
    }
    return (
        <>
        <nav className='flex items-center flex-wrap bg-gray-800 p-1 border-double border-2 w-full  '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
        
            
     

            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              Torneo de cálculo
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3 hover:bg-gray-500 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
       
          {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
          <div
            className={`${
              active ? '' : 'hidden'
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
          >
            <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto '>
            {data.obtenerUsuario? data.obtenerUsuario.role==='admin' && <> <Link href='/misequiposadmin'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center bg-gray-500 hover:text-white mr-80 '>
                  Administrar equipos
                </a>
              </Link></>:<> <Link href='/misequipos'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white mr-80 '>
                  Mis equipos creados
                </a>
              </Link></>}
              {data.obtenerUsuario? data.obtenerUsuario.role==='user' && <> <Link href='/misequipos'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white mr-80 '>
                  Mis equipos creados
                </a>
              </Link></>:''}
              
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white '>
                  Convocatoria
                </a>
              </Link>
              <Link href='/reglas'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                  Reglas
                </a>
              </Link>
              <Link href='/entrenamiento'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                  Entrenamiento
                </a>
              </Link>
              <Link href='/mapas'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                  Mapa del Torneo 
                </a>
              </Link>
              <Link href='/equipos'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                  Los equipos
                </a>
              </Link>
              <Link href='/inscribirequipo'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                 Inscribir a un equipo
                </a>
              </Link>
              {data.obtenerUsuario?<><Link href='/'>
                <a  onClick={()=>deconnecter()} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                 Sign out
                </a>
              </Link></>:<> <Link href='/conexion'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-500 hover:text-white'>
                 Sign in
                </a>
              </Link></>}
             
             
            </div>
          </div>
        </nav>
      </>
    
    )
        

     
        
};

export default Sidebar;