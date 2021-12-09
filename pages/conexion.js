import React,{useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {gql,useMutation} from  '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Swal from 'sweetalert2'; 



const AUTENTICAR_USUARIO=gql`
mutation AutenticarUsuarioMutation($autenticarUsuarioInput: AutenticarInput) {
    autenticarUsuario(input: $autenticarUsuarioInput) {
      token
    }
  }`

const Conexion = () => {
    const router=useRouter()

    const [autenticarUsuario]=useMutation(AUTENTICAR_USUARIO);
    const [mensaje,guardarMensaje]=useState(null);

    const formik=useFormik({
        initialValues:{
            email:'',
            matricula:'',
            password:''


        },
        validationSchema:Yup.object({
            email:Yup.string().email('El email no es válido').required('El email no puede ir vacío'),
            matricula: Yup.string().required('La matricula es obligatoria'),
            password: Yup.string().required('El password es obligatorio')
        }),
        onSubmit:async valores=>{
            const {email , matricula,password}=valores
            console.log(valores)
            try {
                
                const {data}=await autenticarUsuario({
                    variables:{
                        autenticarUsuarioInput:{
                        
                            matricula,
                            password

                        }

                    }
                });
                
                guardarMensaje('Autenticado exitosamente')
                Swal.fire({
                 
                    icon: 'success',
                    title: '¡Conectado! ¡Bienvenido!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                
                setTimeout(()=>{router.reload(window.location.pathname)},1000)

                // guardaremos el token en el storage
                const {token}=data.autenticarUsuario;
                localStorage.setItem('token',token)
                router.push('/')
              
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error',''))
                setTimeout(()=>{guardarMensaje(null)},3000)
                
            }
        }
    })
    const mostrarMensaje=()=>{
        return(
            <div className="bg-white py-2 px-3 w-full my-3 text-center mx-auto border-l-4 border-red-700">
                <p>{mensaje}</p>
            </div>
        )
    }
    const crearlaCuenta=()=>{
        router.push('/createaccount')
    }


    return (

       <Layout>
     
       
         
        <div className="flex justify-center mt-5 ">
        
        <div>{mensaje && mostrarMensaje()}
        <h1 className="  text-center text-white text-3xl mt-5 mb-4">¡CONÉCTATE!</h1>
            <div className="w-full max-w-sm">
                <form
                className="bg-white rounded shadow-md px-8  pt-4 pb-4 mb-4"
                onSubmit={formik.handleSubmit}>
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="email">
                           Email
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="email"
                       type="email"
                       placeholder="Email "
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.email}></input>
                         {formik.touched.email && formik.errors.email ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.email}</p>
                       </div>
                   ) : null}
                   </div>
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="matricula">
                           Matricula
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="matricula"
                       placeholder="Matricula"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.matricula}></input>
                         {formik.touched.matricula && formik.errors.matricula ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.matricula}</p>
                       </div>
                   ) : null}
                   </div>
                   <div className="mb-4">
                       <label className="block-text-gray-700 text-sm font-bold mb-10"  htmlFor="password">
                           Contraseña
                       </label>
                       <input className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="password"
                       placeholder="Contraseña "
                       type="password"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.password}>
                       </input>
                       {formik.touched.password && formik.errors.password ? (
                       <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">Error</p>
                          <p>{formik.errors.password}</p>
                       </div>
                   ) : null}
                   </div>
                   <input 
                   type="submit"
                   className=" bg-red-400 w-full mt-3 p-2 text-white uppercase text-2xl hover:bg-red-500"
                   value="Iniciar sesión"/>
                    <input 
                   type="submit"
                   className=" bg-red-400 w-full mt-3 p-2 text-white uppercase text-2xl hover:bg-red-500"
                   value="No tienes cuenta ?"
                   onClick={()=>crearlaCuenta()}/>

                </form>

        </div>
        </div>    </div> </Layout>
        
    ) 
};

export default Conexion;