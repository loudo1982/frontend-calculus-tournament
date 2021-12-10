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
  
const Reglas = () => {
  

    const[rolee,setRole]=useState('okok')

   
   
    

       
        const {data,loading,error}=useQuery(OBTENER_USUARIO)
        console.log('los datas son',data)
        if(loading) return <div className="text-white">Cargando...</div>;
      
        if(!data) return <h1>Te invito a conectarte</h1>        
         
      
      

    
  
   
    

    

    return (
        <div>
          <Layout>
          <h1 className="text-4xl font-normal leading-normal mt-6 mb-2 text-white text-center underline">
  Reglas del Torneo de cálculo
</h1>
            
         {/*  {data.obtenerUsuario?<h1>{`Tu role es: ${data.obtenerUsuario.role}`} </h1>:'Te invitamos a conectarte'}
           {data.obtenerUsuario===null && <div> Te invitamos a conectarte</div> } 
           {data.obtenerUsuario? data.obtenerUsuario.role==='admin'&& <div onClick={()=>console.log('clique admin')}>Je suis admin </div>:<div>conectate</div> } 
           {data.obtenerUsuario? data.obtenerUsuario.role==='user'&& <div>Je suis user </div>:<div>Je ne suis rien</div> } 
           */}
           <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-white ml-8 underline ">
           Reglas en las partidas:
</h1>

<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-500 border-2 border-white ">
En cada breakout room jugarán 2 equipos. Cada equipo estará integrado por 4 jugadores. En cada partida se responderá a un total de 20 preguntas clasificadas por área de conocimiento: historia, geografía, arte, deporte y ciencia, con una duración máxima por respuesta de 5 segundos. 


</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-500 border-2 border-white ">
Antes de cada pregunta, el coach asignado declarará el área de conocimiento al que la pregunta pertenece. En seguida, cada equipo elegirá al representante que considere más apto para responder según el área. El coach hará la pregunta y ambos representantes tendrán un máximo de 5 segundos para responderla. El turno para responder se otorgará al primero de los representantes que escriba “yo” en el chat de la sesión. Si la respuesta de este representante es errónea, se cederá el turno al oponente. El coach asignado registrará las respuestas correctas de cada equipo para avanzar en el torneo. 
</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-500 border-2 border-white ">
Si el coach considera que algún equipo realiza consultas durante la sesión en internet o en alguna otra fuente, el equipo podrá ser descalificado.
</p>
<p className="text-2xl font-light leading-relaxed mt-0 mb-4 ml-8 pl-2 text-white w-4/6 text-left bg-gray-500 border-2 border-white ">
Cada uno de los integrantes del equipo tiene que tener su cámara encendida.
El torneo consiste en 5 rondas para poder llegar a la gran final, cada ronda se jugará de dos preguntas para obtener al equipo ganador. Si existiera empate o juego desierto, el juez pondrá un tercer ejercicio. 
Cada pregunta tendrá un tiempo de 5 minutos para su solución.
Los equipos irán a enfrentarse en breakout room. Les daremos el número de la sala en la cual se enfrentarán cada uno en un momento.  En este breakout room irá también un juez que es un coach de equipo, pero no será su propio coach, los jueces verificarán y darán validez a las respuestas y procedimientos del equipo ganador de cada ronda. Su juicio es inapelable. En la carpeta de ejercicios que les vamos a compartir a los jueces, viene la solución paso a paso de cada ejercicio, les pedimos que se cubra al menos 80% de estos procedimientos para que se pueda declarar ganador un equipo u otro, en la resolución de ejercicios.
Con los dos equipos en el breakout room y una vez que el maestro juez lea el primer ejercicio de la ronda 1, se empieza a cronometrar el primer ejercicio, los micrófonos deberán quedar apagados y las cámaras prendidas. Favor de no usar imágenes virtuales cómo fondo de pantalla. Los integrantes de cada equipo podrán trabajar juntos por su lado usando otro medio de comunicación ( WhatsApp , Zoom , Meet Google, Hangout , Teams etc…). Cuando un equipo piense que tiene una buena respuesta ya escrita, entonces un integrante deberá mandar su respuesta al juez por mensaje privado en el chat de zoom. Si la respuesta es correcta, el juez confirma el turno al equipo y pide que le muestre en frente de la cámara el procedimiento hecho. Si el juez considera que el proceso es correcto, el equipo gana el punto y se pasará a la siguiente pregunta. Si el juez encuentra el procedimiento erróneo o no completo, se dará el turno de responder al otro equipo. Si al final de los 5 minutos, el otro equipo no ha respondido entonces el equipo 1 podrá volver a dar una respuesta. Si ningún equipo gana, se procederá a la siguiente pregunta. Si después de 2 preguntas, no hay ganador, se procederá a la pregunta de desempate.
El juez declarará la respuesta correcta o no y propondrá otro ejercicio si es necesario. 
Al final de cada ronda, pasará un solo equipo de cada breakout room a la siguiente ronda.
Los equipos eliminados se podrán retirar al finalizar su participación en la ronda una vez que el juez haya dado su veredicto y el equipo ganador deberá regresar a la sala principal y esperar la siguiente ronda.
En la ronda semifinal y final, en cada breakout room van a estar 3 jueces, para que las decisiones sean sin la menor duda, de los 4 equipos que están compitiendo.
Cualquier situación no contemplada en este documento será analizada por el comité organizador y el juez correspondiente.
Ahora, cedo la palabra a mi compañero Tiberiu.
Les pedimos a los jueces que se queden hasta al final del evento, para que den su retroalimentación de lo que sintieron en el torneo y para mandarles los paquetes de diplomas de juez-alumnos.
Los ganadores recibirán una tarjeta digital de Amazon de 500 pesos cada uno y segundo y tercer lugar de 300 pesos por cada participante.


</p>
<div>.</div>

            
            </Layout>
        </div>
    );
};

export default Reglas;