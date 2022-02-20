import Head from 'next/head'
import Layout from '../components/Layout'
import {gql,useQuery} from '@apollo/client';


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
  
const Index = ()=>{

  const {data, loading,error}=useQuery(OBTENER_EQUIPOS)
  const {data1, loading1,error1}=useQuery(OBTENER_EQUIPOS_CREADOR)

  

  
    

  

  return (
  <div>
  
    <Layout>
    <h1 className="text-4xl font-normal leading-normal mb-2 text-white text-center underline mt-6">
  Convocatoria del torneo de cálculo
</h1>
<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
Objetivo:
</h1>

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white ">
El objetivo es una competencia de aplicación de los conocimientos de Cálculo I y Cálculo II en formato torneo respetando el plan analítico de Prepa Tec. 


</p>
<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline">
Reglas: 
</h1>

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white   ">
Las inscripciones son abiertas hasta alcanzar un máximo de 32 equipos.



</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white ">
  Cada equipo asignará a un coach que lo representará, mismos que estarán presentes el día del torneo apoyando al comité organizador.Las o los coaches deben ser profesores de la institución.</p>

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white">Los equipos se enfrentarán 1 a 1 en eliminatorias de 15 a 20 minutos, donde obtendremos un ganador que pasará a la siguiente ronda, así sucesivamente hasta obtener un equipo campeón.</p>

<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
A quién está dirigido:
</h1>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white ">Está dirigido a alumnos de preparatoria de Prepa Tec de sexto grado que han cursado las materias de cálculo 1 y cálculo 2.

     </p>

     <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline">Fecha del evento: </h1>
     <p className=" text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white "> Viernes 22 de Abril de las 4:00 pm ( hora centro). 
La duración del evento es de 2 a 3 horas.
 </p>

     <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline w-5/6 ">Cierre de inscripciones:
 </h1>
     <p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white "> Viernes 15 de abril a medianoche.
</p>
<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline">Premios: 
 </h1>
     <p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white ">El equipo ganador y el segundo lugar tendrán un buen premio.
</p>

<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
Los temas del torneo:
</h1>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white ">
 <li>Asíntotas y puntos huecos</li>

<li>análisis de funciones polinomiales y racionales</li>
<li>Cinemática</li>
 <li>Razones de cambio </li>
<li>Áreas</li> 
<li>Volúmenes</li> 
<li>Optimización</li>

     </p>
     <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
Zoom id del torneo:
</h1>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white "> El torneo se llevará a cabo por medio de zoom( zoom id 769 910 7319).

     </p>
<div>
<h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">Organizadores: 
 </h1>
     <p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white  ">Carlos Aurelio Robles Amador:	PrepaTec Metepec ; mail: ca.robles.amador@tec.mx </p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white  ">Tiberiu Hrabak: PrepaTec Guadalajara	;	mail:thrabak@tec.mx </p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white  ">Osvaldo Samayoa Ochoa:PrepaTec Chiapas; mail: osvaldo.samayoa@tec.mx </p>
 <p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white  ">Ludovic Betton: PrepaTec Sonora Norte ;	mail: ludovic@tec.mx  </p>
 

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-5/6 text-left bg-gray-500 border-2 border-white  "> Más información al whatsapp: 6624332660</p>

<p className="bg-gray-700">.
</p></div>


    </Layout>
    
  </div> )
}

export default Index;
