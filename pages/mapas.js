import React, { useEffect, useState,Fragment } from 'react';
import Layout from '../components/Layout'
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime, RoundProps, RenderSeedProps } from 'react-brackets';
import {gql,useQuery} from '@apollo/client';


  

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
  
  
const Mapas = () => {
  const [equipos,setEquipos]=useState(['-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------'
,'-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------','-------------'])

    const[index,setIndex]=useState('32')
 
  const {data, loading,error}=useQuery(OBTENER_EQUIPOS)
  

  console.log('los equipos son',data)
  console.log(loading)

  console.log(error)

  if(loading) return <div className="text-white">Cargando...</div>;
  if(!data) return <div className="text-white">Cargando...</div>;
  
   for (var i = 0; i < data.obtenerEquipos.length; i++) {
     equipos[i]=data.obtenerEquipos[i].NombreEquipo
   
   
 }
 
  // data.obtenerEquipos.map(equipo=> equipos.splice(equipo.NombreEquipo))
  console.log('a voir',equipos)


  
 
  
   

  const rounds = [
    {
      title: 'Ronda 1',
      seeds: [
        {
          id: 1,
          date: 'Room 1 juez:Alejandra Mandujano ',
          teams: [{ name: equipos[0]}, { name:  equipos[14] }],
        },
        {
          id: 2,
          date: 'Room 2 Juez: Carlos Javier Reyna  ',
          teams: [{ name: equipos[4] }, { name: equipos[5] }],
        },
        {
          id: 3,
          date: 'Room 3  juez: Javier Díaz ',
          teams: [{ name: equipos[8]}, { name:  equipos[9] }],
        },
        {
          id: 4,
          date: 'Room 5 :Jesús Omar Monteagudo ',
          teams: [{ name: equipos[10] }, { name: equipos[11] }],
        },
        {
          id: 5,
          date:'Room 5 Juez: Carla D´Alessandro',
          teams: [{ name: equipos[16]}, { name:  equipos[23] }],
        },
        {
          id: 6,
          date: 'Room 6 ',
          teams: [{ name: equipos[18] }, { name: equipos[25] }],
        },
        {
          id: 7,
          date: 'Room 7 ',
          teams: [{ name: equipos[20]}, { name:  equipos[27] }],
        },
        {
          id: 8,
          date: 'Room 8',
          teams: [{ name: equipos[22] }, { name: equipos[29] }],
        },
        {
          id: 9,
          date: 'Room 9',
          teams: [{ name: equipos[17]}, { name:  equipos[31] }],
        },
        {
          id: 10,
          date:'Room 10',
          teams: [{ name: equipos[3] }, { name: equipos[30] }],
        },
        {
          id: 11,
          date: 'Room 11',
          teams: [{ name: equipos[19]}, { name:  equipos[28] }],
        },
        {
          id: 12,
          date:'Room 12',
          teams: [{ name: equipos[12] }, { name: equipos[26] }],
        },
        {
          id: 13,
          date: 'Room 13 juez:Brenda Verdugo ',
          teams: [{ name: equipos[1]}, { name:  equipos[15] }],
        },
        {
          id: 14,
          date:'Room 14 Juez: Eloir Gilbon',
          teams: [{ name: equipos[7] }, { name: equipos[13] }],
        },
        {
          id: 15,
          date: 'Room 15 Juez: Ramón Felix Llanes',
          teams: [{ name: equipos[21]}, { name:  equipos[2] }],
        },
        {
          id: 16,
          date: 'Room 16 ',
          teams: [{ name: equipos[24] }, { name: equipos[6] }],
        },
      ],
    },
    {
      title: 'Ronda 2',
      seeds: [
        {
          id: 1,
          date: 'Room 1 # 32-33',
          teams: [{ name:equipos[32]}, { name: equipos[33]}],
        },
        {
          id: 2,
          date: 'Room 2 # 34-35',
          teams: [{ name: equipos[34] }, { name:equipos[35] }],
        },
        {
          id: 3,
          date: 'Room 3 # 36-37',
          teams: [{ name: equipos[36]}, { name: equipos[37] }],
        },
        {
          id: 4,
          date: 'Room 4 # 38-39',
          teams: [{ name:equipos[38] }, { name:equipos[39]}],
        },
        {
          id: 5,
          date: 'Room 5 # 40-41',
          teams: [{ name: equipos[40]}, { name: equipos[41] }],
        },
        {
          id: 6,
          date: 'Room 6 # 42-43',
          teams: [{ name:equipos[42] }, { name: equipos[43] }],
        },
        {
          id: 7,
          date:'Room 7 # 44-45',
          teams: [{ name:equipos[44]}, { name: equipos[45] }],
        },
        {
          id: 8,
          date: 'Room 8 # 46-47',
          teams: [{ name:equipos[46] }, { name:equipos[47] }],
        },
      ],
    },
    {
      title: 'Ronda 3',
      seeds: [
        {
          id: 1,
          date: 'Room 1 # 48-49',
          teams: [{ name: equipos[48]}, { name: equipos[49]}],
        },
        {
          id: 2,
          date: 'Room 2 # 50-51',
          teams: [{ name: equipos[50] }, { name:equipos[51] }],
        },
        {
          id: 3,
          date: 'Room 3 # 52-53',
          teams: [{ name: equipos[52]}, { name:  equipos[53] }],
        },
        {
          id: 4,
          date:'Room 4 # 54-55',
          teams: [{ name:equipos[54] }, { name:equipos[55] }],
        },
       
      ]
    },
    {
      title: 'Semi final',
      seeds: [
        {
          id: 1,
          date: 'Room 1 # 56-57',
          teams: [{ name: equipos[56]}, { name: equipos[57]}],
        },
        {
          id: 2,
          date: 'Room 2 # 58-59',
          teams: [{ name: equipos[58] }, { name:equipos[59] }],
        }
       
      ]
    },
    {
      title: 'Final',
      seeds: [
        {
          id: 1,
          date: 'Sala Principal # 60-61',
          teams: [{ name: equipos[60]}, { name: equipos[61]}],
        }
     
       
      ]
    },
   
  ]
  
   
  
  
 
  
  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setEquipos({
        ...equipos,
        [event.target.name] : event.target.value
        
    })
   
}
const handleInputChangeindex=(event)=>{
  setIndex(event.target.value)
}

const enviarDatos = (event) => {
    event.preventDefault()
  
   
}

    return (
      
      <Layout>
      
<Fragment>
            
            <form className="flex justify-center mt-4 bg-gray-700 w-full "  onSubmit={enviarDatos} >
                <div className="mr-4">
                    <input type="text" placeholder="Ganador"  onChange={handleInputChange} name={index}
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="# Partido"  onChange={handleInputChangeindex} name="index"
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></input>
                </div>
              
            </form>
           
        </Fragment>
        <div className="min-h-screen bg-gray-700 w-full ">
    <Bracket rounds={rounds}  roundClassName={'bg-gray-700 '} /> 
   </div>

      </Layout> 
    );
  };
  

    
  

   
  

 // {data.obtenerEquipos.map(equipo=>(<h1>equipo  {equipo.id}</h1>))}
                 
                   
              
 


  
    




export default Mapas;