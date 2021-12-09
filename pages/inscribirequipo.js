
import "react-step-progress-bar/styles.css";
import { ProgressBar,Step} from "react-step-progress-bar";


import Image from 'next/image'
import flechedroite from '../images/flechedroite.png';
import flechegauche from '../images/flechegauche.png';
import NestedExample from './ajeter';

import React,{useState} from 'react';
import Layout from '../components/Layout'
import {useFormik,getIn} from 'formik';
import * as Yup from 'yup';
import {useQuery,gql, useMutation} from '@apollo/client';
import{useRouter} from 'next/router';
import Essai from "./essai";


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

const Inscribirequipo = () => {


   
  const {data,loading,error}=useQuery(OBTENER_USUARIO)
       
  if(loading) return <div className="text-white">Cargando...</div>;


  console.log('el usuario es',data)
  if(data.obtenerUsuario){
  return(<Layout><Essai/></Layout> )}else{



  return (
    

    <Layout>
       
          <h1 className="  text-center text-white text-3xl m-4">Debes conectarte para poder crear equipos</h1>

           

    </Layout>
    
  )}
};



export default Inscribirequipo;