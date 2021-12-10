import React,{useState} from 'react';
import Layout from '../components/Layout';
import {gql,useQuery,useMutation} from '@apollo/client';
import Swal from 'sweetalert2';



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

const BORRAREQUIPO=gql`
mutation BorrarEquipoMutation($borrarEquipoId: ID!) {
    borrarEquipo(id: $borrarEquipoId)
  }
`;
const OBTENER_EQUIPOS_CREADOR=gql`
query ObtenerEquipoCreadadorMutation {
    obtenerEquipoCreadador {
        NombreEquipo
        Escuela
        id
      joueur1 {
        nombre
      }
      joueur2 {
        nombre
      }
      joueur3 {
        nombre
      }
      joueur4 {
        nombre
      }
      coach {
        nombre
      }
    }
  }

  `

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
const Misequiposadmin = () => {
    
    const [lid , setId]=useState('')
    
    const {data, loading,error}=useQuery(OBTENER_EQUIPOS)

    const [borrarEquipo]=useMutation(BORRAREQUIPO,{
        update(cache){
           
            
            const{obtenerEquipos}=cache.readQuery({query:OBTENER_EQUIPOS});
           

          
          
            
  
            //reescribimos el cache
          
            
          cache.writeQuery({
             
            query:OBTENER_EQUIPOS,
            data:{
             
                obtenerEquipos:obtenerEquipos.filter(equipoActual=>equipoActual.id !==lid)

            }
        })
        }
    })
    

    console.log('los equipos son',data)
    console.log(loading)

    console.log(error)

    if(loading) return <div className="text-white">Cargando...</div>;
    if(!data) return <div className="text-white">Cargando...</div>;
      
  
    const confirmarEliminarCliente=(id)=>{

        Swal.fire({
            title: '¿Deseas eliminar a este equipo?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si,Eliminar!',
            cancelButtonText:'No,Cancelar'
          }).then(async(result) => {
            setId(id)
            console.log('l id est',id)
            if (result.isConfirmed) {
                try {

                    //eliminar por ID
                    const {data}=await borrarEquipo({
                        variables:{
                            
                            borrarEquipoId:id
                            
                        }
                    });
                    console.log(data)
                    Swal.fire(
                        'Eliminado',
                        data.borrarEquipo,
                        'success'
        
                      )
                    
                } catch (error) {
                    console.log(error)
                    
                }
             
            }
          })

      

    }
    
   
    return (
       
       
            
        <Layout>
           
        <h1 className="  text-center text-white text-3xl"> Los equipos</h1>

        <h1 className="  text-center text-white text-3xl"> {`¡ Quedan ${32-data.obtenerEquipos.length} lugares!`}</h1>




        <table className="  shadow-md mt-10 w-full w-lg   ">
        <thead className="bg-gray-400 border-gray-900 border-2">
        <tr>  <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">#</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Nombre del equipo</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Prepa tec</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 1</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 2</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 3</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Jugador 4</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Coach</th>
               <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Eliminar</th>
              
        

       
    </tr>

        </thead>
        <tbody className="bg-white">
            {data.obtenerEquipos.map((equipo,i)=>(
              
                
                
              <tr key={equipo.id} className="bg-gray-300 lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">#</span>
                  {i+1}
              </td>
               <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
               <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Nombre equipo:</span>
                  {equipo.NombreEquipo}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Escuela:</span>
                  {equipo.Escuela}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Juagador 1:</span>
                  {equipo.joueur1.nombre}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Jugador 2</span>
                  {equipo.joueur2.nombre}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Juagdor 3:</span>
                  {equipo.joueur3.nombre}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Jugador 4:</span>
                  {equipo.joueur4.nombre}
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-gray-300 px-2 py-4 text-xs font-bold uppercase">Coach:</span>
                  {equipo.coach.nombre}
              </td>
             
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                 <button 
                 type="button" 
                 className="flex justify-center items-center m-2 bg-gray-800 py-2 text-white rounded text-xs uppercase font-bold w-full "
                 onClick={()=>confirmarEliminarCliente(equipo.id)}>
                     Eliminar 
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </button>
              </td>
              
              </tr>
            ))}

        </tbody></table>
         </Layout>
       
    );
    
};

export default Misequiposadmin;