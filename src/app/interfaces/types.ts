//Interfaces de Tipos de Datos llamado al HomePage
export interface Candidato {
    _id:string;
    id: string;
    personaData: {
      nombre: string;
      apellido: string;
      telefono: string;
    };
    Candidato: {
      perfil: {
        puestoDeseado: string;
      };
    };
  }
  
  export interface CandidateApiResponse {
    dataCandidatosPremium: Candidato[];
  }
  