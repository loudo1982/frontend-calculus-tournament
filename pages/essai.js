import React,{useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {useQuery,gql, useMutation} from '@apollo/client';
import{useRouter} from 'next/router';
import Swal from 'sweetalert2'; 

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
    export const SignupSchema = Yup.object().shape({
        Escuela: Yup.string().min(5, "El nombre debe ser de 5 letras mínimo").required("El nombre de la escuela es obligatorio"),
        NombreEquipo: Yup.string().min(5, "El nombre debe ser de 5 letras mínimo").required("El nombre del equipo es obligatorio"),
       
    
      joueur1: Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        matricula: Yup.string().required("La matricula es obligatoria"),
        email: Yup.string().required("El email es obligatorio").email('El email debe tener el formato de un email')
      }),
      joueur2: Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        matricula: Yup.string().required("La matricula es obligatoria"),
        email: Yup.string().required("El email es obligatorio").email('El email debe tener el formato de un email')
      }),
      joueur3: Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        matricula: Yup.string().required("La matricula es obligatoria"),
        email: Yup.string().required("El email es obligatorio").email('El email debe tener el formato de un email')
      }),
      joueur4: Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        matricula: Yup.string().required("La matricula es obligatoria"),
        email: Yup.string().required("El email es obligatorio").email('El email debe tener el formato de un email')
      }),
      coach: Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio"),
        matricula: Yup.string().required("La matricula es obligatoria"),
        email: Yup.string().required("El email es obligatorio").email('El email debe tener el formato de un email')
      })
    });



const Essai = () => {
  const router=useRouter()
   //State para el mensaje
   const [mensaje,guardarMensaje]=useState(null)
  const {data, loading,error}=useQuery(OBTENER_EQUIPOS)
     const {data1, loading1,error1}=useQuery(OBTENER_EQUIPOS_CREADOR)

    const {data:data2,loding:loading2,error: error2}=useQuery(OBTENER_USUARIO)
    
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
       
    if(loading2) return <div className="text-white">Cargando...</div>
  
  
    console.log('el usuario00000 es',data2)

     
     

 

const mostrarMensaje=()=>{
    return(
        <div className="bg-white py-2 px-3 w-full my-3 text-center mx-auto border-l-4 border-gray-700">
            <p>{mensaje}</p>
        </div>
    )
}
      

      return(
    <div className="flex justify-center mt-5">
        


   
   
    <Formik
      initialValues={{
       
        Escuela:'',
        NombreEquipo:'',
        joueur1:{nombre:'',matricula:'',email:''},
        joueur2:{nombre:'',matricula:'',email:''},
        joueur3:{nombre:'',matricula:'',email:''},
        joueur4:{nombre:'',matricula:'',email:''},
        coach:{nombre:'',matricula:'',email:''}
      }}
      validationSchema={SignupSchema}
      onSubmit={async valores => {
        // same shape as initial values
        console.log(valores);
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
                Swal.fire({
                 
                  icon: 'success',
                  title: 'Equipo creado correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })
                guardarMensaje(null);
                router.push('/equipos')
            
            
            

        } catch (erreur) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: erreur.message.replace('GraphQL error','') ,
                footer: 'Haz el cambio necesario para crear el equipo'
              })
           console.log('l erreur est',erreur)
           guardarMensaje(erreur.message.replace('GraphQL error',''))
           setTimeout(()=>{guardarMensaje(null)},3000)
        }
        console.log('enviando');
          console.log('los valores',valores)
      }}
    >


      {({ errors, touched }) => (


<div className="w-full max-w-sm">
{mensaje && mostrarMensaje()}
<h1 className="  text-center text-white text-3xl mt-5 mb-4">¡CREA TU EQUIPO!</h1>
       <Form  className="bg-white rounded shadow-md px-8  pt-4 pb-4 mb-8">
      
     
         
         <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="Escuela">
                         Escuela
                     </label>
                     <Field name="Escuela" placeholder="Escuela" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" />
         {errors.Escuela && touched.Escuela ? (
              <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
              <p className="font-bold">Error</p>
           <div >{errors.Escuela}</div></div>
         ) : null}
         <br />

         <div className="mb-4">
         <label className="block-text-gray-700 text-sm font-bold mb-10 "  htmlFor="NombreEquipo">
         Nombre del equipo
                     </label>
         <Field name="NombreEquipo" placeholder="Nombre del equipo" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
         {errors.NombreEquipo && touched.NombreEquipo ? (
              <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
           <div>{errors.NombreEquipo}</div></div>
         ) : null}
         <br /> </div>

         <div className="mb-4">

         <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.nombre">
         Nombre del jugador 1
                     </label>

         <Field name="joueur1.nombre" placeholder="Nombre" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   />
        
        {errors.joueur1 && errors.joueur1.nombre && touched.joueur1 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur1.nombre}</div> </div>
        ) : (
          ""
        )}
        <br /></div>

        <div className="mb-4">

        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.matricula">
         Matricula del jugador 1
                     </label>

        <Field name="joueur1.matricula" placeholder="Matricula " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur1 && errors.joueur1.matricula && touched.joueur1 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur1.matricula}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur1.email">
         Email del jugador 1
                     </label>

        <Field name="joueur1.email" placeholder="Email " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur1 && errors.joueur1.email && touched.joueur1 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur1.email}</div></div>
        ) : (
          ""
        )}
        <br /></div>

        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.nombre">
        Nombre del jugador 2
                     </label>

        <Field name="joueur2.nombre" placeholder="Nombre " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur2 && errors.joueur2.nombre && touched.joueur2 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur2.nombre}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.matricula" >
        Matricula del jugador 2
                     </label>


        <Field name="joueur2.matricula" placeholder="Matricula" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur2 && errors.joueur2.matricula && touched.joueur2 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur2.matricula}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur2.email">
        Email del jugador 2
                     </label>


        <Field name="joueur2.email" placeholder="Email" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur2 && errors.joueur2.email && touched.joueur2 ? (
              <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur2.email}</div></div>
        ) : (
          ""
        )}
        <br /></div>

        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.nombre">
        Nombre del jugador 3
                     </label>



        <Field name="joueur3.nombre" placeholder="nombre joueur 3 " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur3 && errors.joueur3.nombre && touched.joueur3 ? (
              <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur3.nombre}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.matricula">
        Matricula del jugador 3
                     </label>


        <Field name="joueur3.matricula" placeholder="matricula joueur 3 " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur3 && errors.joueur3.matricula && touched.joueur3 ? (
             <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur3.matricula}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur3.email">
        Email del jugador 3
                     </label>


        <Field name="joueur3.email" placeholder="Email  " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur3 && errors.joueur3.email && touched.joueur3 ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur3.email}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.nombre">
        Nombre del jugador 4
                     </label>


        <Field name="joueur4.nombre" placeholder="Nombre" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur4 && errors.joueur4.nombre && touched.joueur4 ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur4.nombre}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.matricula">
        Matricula del jugador 4
                     </label>


        <Field name="joueur4.matricula" placeholder="Matricula" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur4 && errors.joueur4.matricula && touched.joueur4  ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur4.matricula}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="joueur4.email">
        Email del jugador 4
                     </label>


        <Field name="joueur4.email" placeholder="Email" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.joueur4 && errors.joueur4.email && touched.joueur4 ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.joueur4.email}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">

        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.nombre">
        Nombre del Coach
                     </label>


        <Field name="coach.nombre" placeholder="Nombre " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.coach && errors.coach.nombre && touched.coach ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.coach.nombre}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.matricula">
        Nómina del coach
                     </label>


        <Field name="coach.matricula" placeholder="Nomina" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.coach && errors.coach.matricula && touched.coach ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.coach.matricula}</div></div>
        ) : (
          ""
        )}
        <br /></div>
        <div className="mb-4">
        <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="coach.email">
        Email del coach
                     </label>


        <Field name="coach.email" placeholder="Email " className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        
        {errors.coach && errors.coach.email && touched.coach ? (
            <div className="my-2 bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4">
          <div>{errors.coach.email}</div></div>
        ) : (
          ""
        )}
        <br /></div>

        <div className="mb-4">
        <input 
                 type="submit"
                 className=" bg-gray-700 w-full mt-3 p-2 text-white uppercase text-2xl hover:bg-gray-500"
                 value="Crear equipo"/> </div>
     </Form> </div>
      )}
    </Formik> 
  </div> )} 
;
export default Essai;