import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt,faClock } from '@fortawesome/free-solid-svg-icons'

export default function HomeCandidate() {
  return (
    <div>
        {/* Todo realizado con Tailwind */}
       
          <h1 className="text-3xl font-bold mb-4">Bienvenido, Candidato</h1>
                {/* Lista de empleos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Agregar Titulo</h2>
                        <div className="flex items-center text-gray-500 mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-1" />
                            <span>Ubicacion</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
                            <span>Tiempo de Publicacion</span>
                        </div>    
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Ver detalles</button>
                        
                    </div> {/* Empleo 1 */}
                   
                    <div className="bg-white shadow-md p-4 rounded-lg">
                       
                    </div> {/* Empleo 2 */}
                    {/* Empleo 3 */}
                    <div className="bg-white shadow-md p-4 rounded-lg">
                      
                    </div> {/* Empleo 3 */}
                
                </div>
    </div>
  )
}
