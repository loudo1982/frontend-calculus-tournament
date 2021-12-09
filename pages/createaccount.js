


import React,{useState} from 'react';
import Layout from '../components/Layout'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';
import{useRouter} from 'next/router'; 
import Swal from 'sweetalert2'; 

const NUEVA_CUENTA=gql`
mutation NuevoUsuarioMutation($nuevoUsuarioInput: UsuarioInput) {
    nuevoUsuario(input: $nuevoUsuarioInput) {
      apellido
      role
      id
      nombre
    }
  }`

const Createaccount = () => {

    const router=useRouter()

    //State para el mensaje
    const [mensaje,guardarMensaje]=useState(null)

  // Mutation para crear nuevos usuarios
  const[nuevoUsuario]=useMutation(NUEVA_CUENTA)

    // validació del formulario 
    const formik=useFormik({
        initialValues:{
            nombre:'',
            apellido:'',
            matricula:'',
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            nombre:Yup.string().required('El Nombre es Obligatorio'),
            apellido:Yup.string().required('El apellido es Obligatorio'),
            matricula:Yup.string().required('La matricula es Obligatoria'),
            email:Yup.string().email('El email no es válido').required('El mail es Obligatorio'),
            password:Yup.string().required('La contraseña es obligatoria').min(6,'El password debe ser de al menos 6 carácteres.'),

        }),
        onSubmit:async valores=>{
            const{nombre,apellido,email,matricula,password}=valores
            try {
                const {data}=await nuevoUsuario({
                    variables:{
                        nuevoUsuarioInput:{
                            nombre,
                            apellido,
                            email,
                            matricula,
                            password
                            
                        }
                    }
                })
                console.log('la reponse du serveur est:',data)
                guardarMensaje('Usuario creado correctamente')
                Swal.fire({
                 
                    icon: 'success',
                    title: 'Usuario creado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                guardarMensaje(null);
                router.push('conexion')
                

            } catch (error) {
               guardarMensaje(error.message.replace('GraphQL error',''))
               setTimeout(()=>{guardarMensaje(null)},3000)
            }
            console.log('enviando');
            console.log(valores)
        }
    })
    const mostrarMensaje=()=>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 text-center mx-auto border-l-4 border-red-700">
                <p>{mensaje}</p>
            </div>
        )
    }
  
    return (
       <Layout>
      
       
        <div className="flex justify-center mt-5">
        <div>{mensaje && mostrarMensaje()}
        <h1 className="  text-center text-white text-3xl mt-5 mb-4">¡CREA TU CUENTA!</h1>
            
            <div className="w-full max-w-sm">
                <form
                className="bg-white rounded shadow-md px-8  pt-4 pb-4 mb-4"
                onSubmit={formik.handleSubmit}>
                     <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="nombre">
                           Nombre
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="nombre"
                       placeholder="Nombre"
                       value={formik.values.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                   {formik.touched.nombre && formik.errors.nombre ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.nombre}</p>
                       </div>
                   ) : null}
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="apellido">
                           Apellido
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="apellido"
                       placeholder="Apellido"
                       value={formik.values.apellido}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}>
                       </input>
                   </div>
                   {formik.touched.apellido && formik.errors.apellido ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.apellido}</p>
                       </div>
                   ) : null}
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="email">
                           Email
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="email"
                       type="email"
                       placeholder="Email "
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}></input>
                   </div>
                   {formik.touched.email && formik.errors.email ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.email}</p>
                       </div>
                   ) : null}
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="matricula">
                           Matricula
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="matricula"
                       placeholder="Matricula"
                       value={formik.values.matricula}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}></input>
                   </div>
                   {formik.touched.matricula && formik.errors.matricula ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.matricula}</p>
                       </div>
                   ) : null}
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="contraseña">
                           Contraseña
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="password"
                       placeholder="Contraseña "
                       type="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       ></input>
                   </div>
                   {formik.touched.password && formik.errors.password ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.password}</p>
                       </div>
                   ) : null}
                   <input 
                   type="submit"
                   className=" bg-red-400 w-full mt-3 p-2 text-white uppercase text-2xl hover:bg-red-500"
                   value="Crear cuenta"/>

                </form>

        </div>
        </div>
        </div>
        </Layout>
    );
}; 

export default Createaccount;
