import React,{useState} from 'react';
import Layout from '../components/Layout'
import {useFormik,getIn} from 'formik';
import * as Yup from 'yup';
import {useQuery,gql, useMutation} from '@apollo/client';
import{useRouter} from 'next/router';

const CREAREQUIPO=gql`
mutation CrearnuevoEquipoMutation($crearnuevoEquipoInput: EquipoInput) {
    crearnuevoEquipo(input: $crearnuevoEquipoInput) {
      Escuela
      NombreEquipo
      joueur1{
        nombre
        email
        matricula}
      joueur2{
        nombre
        email
        matricula}
      joueur3{
        nombre
        email
        matricula}
      joueur4{
        nombre
        email
        matricula}
        coach{
        nombre
        email
        matricula,
        },creador,
        id}
  }
`
const OBTENER_EQUIPOS=gql`
query ObtenerEquiposMutation {
    obtenerEquipos {
        id
      NombreEquipo
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

  const OBTENER_EQUIPOS_CREADOR=gql`
  query ObtenerEquipoCreadadorMutation {
      obtenerEquipoCreadador {
          NombreEquipo
          Escuela
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

const Equipo = () => {
    const router=useRouter()

    //State para el mensaje
    const [mensaje,guardarMensaje]=useState(null)

  // Mutation para crear nuevos usuarios
  const[crearnuevoEquipo]=useMutation(CREAREQUIPO,{
      update(cache,{data:{crearnuevoEquipo}}){
          const{obtenerEquipos}=cache.readQuery({query:OBTENER_EQUIPOS});
          const{obtenerEquipoCreadador}=cache.readQuery({query:OBTENER_EQUIPOS_CREADOR}); 
          

          //reescribimos el cache
          cache.writeQuery({
              query:OBTENER_EQUIPOS,
              data:{
                obtenerEquipos:[...obtenerEquipos,crearnuevoEquipo],
               

              }
           
          }),
          cache.writeQuery({
           
            query:OBTENER_EQUIPOS_CREADOR,
            data:{
             
              obtenerEquipoCreadador:[...obtenerEquipoCreadador,crearnuevoEquipo]

            }
        })
      }
  })

    // validació del formulario 
    const formik=useFormik({
        initialValues:{
            Escuela:'',
            NombreEquipo:'',
            joueur1:{nombre:'',matricula:'',email:''},
            joueur2:{nombre:'',matricula:'',email:''},
            joueur3:{nombre:'',matricula:'',email:''},
            joueur4:{nombre:'',matricula:'',email:''},
            coach:{nombre:'',matricula:'',email:''}
        
        },
        validationSchema:Yup.object({
            Escuela:Yup.string().required('El nombre de la escuela es Obligatorio'),
            NombreEquipo:Yup.string().required('El equipo es Obligatorio'),
            //joueur1: Yup.object({
              //  nombre: Yup.string().required('Facebook username is required'),
              //  matricula: Yup.string().required('LinkedIn username is required'),
               // email: Yup.string().required('LinkedIn username is required')
             // }),
            
           // matricula: Yup.string().required('La matricula es  obligatoria'),
           // email: Yup.string().email('El email no es válido').required('El email es obligatorio')
        })
            
            //joueur2:Yup.string().required('El nombre del jugador 2 es obligatorio'),
            //joueur3:Yup.string().required('El nombre del jugador 3 es obligatorio'),
            //joueur4:Yup.string().required('El nombre del jugador 4 es obligatorio'),
            //coach:Yup.string().required('El nombre del coach es obligatorio'),
            //matricula:Yup.string().required('La matricula es Obligatoria'),
            //email:Yup.string().email('El email no es válido').required('El mail es Obligatorio'),
           // password:Yup.string().required('La contraseña es obligatoria').min(6,'El password debe ser de al menos 6 carácteres.'),

        ,
        onSubmit:async valores=>{
            const{Escuela,NombreEquipo,joueur1,joueur2,joueur3,joueur4,coach}=valores
            try {
                const {data}= await crearnuevoEquipo({
                    variables:{
                        crearnuevoEquipoInput:{
                            Escuela,
                            NombreEquipo,
                            joueur1:{nombre:joueur1.nombre,email:joueur1.email,matricula:joueur1.matricula},
                            joueur2:{nombre:joueur2.nombre,email:joueur2.email,matricula:joueur2.matricula},
                            joueur3:{nombre:joueur3.nombre,email:joueur3.email,matricula:joueur3.matricula},
                            joueur4:{nombre:joueur4.nombre,email:joueur4.email,matricula:joueur4.matricula},                         
                            coach:{nombre:coach.nombre,email:coach.email,matricula:coach.matricula}
                            
                        }
                    }
                })
                console.log('la reponse du serveur est:',data)
             
                    guardarMensaje('Equipo creado correctamente')
                    setTimeout(()=>{guardarMensaje(null)},3000)
                    router.push('/equipos')
                
                
                

            } catch (erreur) {
               console.log('l erreur est',erreur)
               guardarMensaje(erreur.message.replace('GraphQL error',''))
               setTimeout(()=>{guardarMensaje(null)},3000)
            }
            console.log('enviando');
            console.log('los valores',valores)
        }
    })

    
    const mostrarMensaje=()=>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 text-center mx-auto border-l-4 border-gray-700">
                <p>{mensaje}</p>
            </div>
        )
    }
  
    return (
       
      
        <div>{mensaje && mostrarMensaje()}
        <div className="flex justify-center mt-5">
           
            
            <div className="w-full max-w-sm">
                <form
                className="bg-white rounded shadow-md px-8  pt-4 pb-4 mb-4"
                onSubmit={formik.handleSubmit}>
                     <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="Escuela">
                           Escuela
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="Escuela"
                       placeholder="Nombre de la escuela"
                       value={formik.values.Escuela}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                   
                    {formik.touched.Escuela && formik.errors.Escuela ? (
                       <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-800 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.Escuela}</p> 
                       </div>
                   ) : null}
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="NombreEquipo">
                           Equipo
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="NombreEquipo"
                       placeholder="Nombre del equipo"
                       value={formik.values.NombreEquipo}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                   {formik.touched.NombreEquipo && formik.errors.NombreEquipo ? (
                       <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-800 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.NombreEquipo}</p>
                       </div>
                   ) : null}

                      <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.nombre">
                           Nombre del jugador 1
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur1.nombre"
                       placeholder="Nombre del jugador 1"
                       required
                       name="joueur1.nombre"
                       value={formik.values.joueur1.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>

                
                 

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.matricula">
                           Matricula del jugador 1
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur1.matricula"
                       required
                       placeholder="Matricula del jugador 1"
                       name="joueur1.matricula"
                       value={formik.values.joueur1.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                 

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.email">
                           Email del jugador 1
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur1.email"
                       required
                       placeholder="Email del jugador 1"
                       name="joueur1.email"
                       value={formik.values.joueur1.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  


<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.nombre">
                           Nombre del jugador 2
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur2.nombre"
                       required
                       placeholder="Nombre del jugador 2"
                       name="joueur2.nombre"
                       value={formik.values.joueur2.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.matricula">
                           Matricula del jugador 2
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur2.matricula"
                       required
                       placeholder="Matricula del jugador 2"
                       name="joueur2.matricula"
                       value={formik.values.joueur2.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                   

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.email">
                           Email del jugador 2
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur2.email"
                       required
                       placeholder="Email del jugador 2"
                       name="joueur2.email"
                       value={formik.values.joueur2.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  




<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.nombre">
                           Nombre del jugador 3
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur3.nombre"
                       required
                       placeholder="Nombre del jugador 3"
                       name="joueur3.nombre"
                       value={formik.values.joueur3.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.matricula">
                           Matricula del jugador 3
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur3.matricula"
                       placeholder="Matricula del jugador 3"
                       required
                       name="joueur3.matricula"
                       value={formik.values.joueur3.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.email">
                           Email del jugador 3
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur3.email"
                       placeholder="Email del jugador 3"
                       required
                       name="joueur3.email"
                       value={formik.values.joueur3.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  



<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.nombre">
                           Nombre del jugador 4
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur4.nombre"
                       placeholder="Nombre del jugador 4"
                       required
                       name="joueur4.nombre"
                       value={formik.values.joueur4.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                 

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.matricula">
                           Matricula del jugador 4
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur4.matricula"
                       placeholder="Matricula del jugador 4"
                       required
                       name="joueur4.matricula"
                       value={formik.values.joueur4.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                 

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.email">
                           Email del jugador 4
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="joueur4.email"
                       required
                       placeholder="Email del jugador 4"
                       name="joueur4.email"
                       value={formik.values.joueur4.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                 




<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.nombre">
                           Nombre del coach
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="coach.nombre"
                       placeholder="Nombre del coach"
                       name="coach.nombre"
                       required
                       value={formik.values.coach.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                 

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.matricula">
                           Matricula del coach
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="coach.matricula"
                       placeholder="Matricula del coach"
                       name="coach.matricula"
                       required
                       value={formik.values.coach.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  

<div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.email">
                           Email del jugador 1
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="coach.email"
                       placeholder="Email del coach"
                       required
                       name="coach.email"
                       value={formik.values.coach.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                  

                  
                   <input 
                   type="submit"
                   className=" bg-blue-800 w-full mt-3 p-2 text-white uppercase text-2xl hover:bg-blue-700"
                   value="Crear cuenta"/>

                </form>

        </div>
        </div>
        </div>
 
    );
};

export default Equipo;