// interfaces.ts
export interface Candidate {
  _id: string;
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

export interface CandidateListResponse {
  dataCandidatosPremium: Candidate[];
}

export interface PaymentData {
  emailZinli?: string;
  emailPaypal?: string;
  emailBinance?: string;
  pagowhatsapp?:string;
  pagotelefono?: string;
  banco?: string;
  pagocedula?: string;
  monto?: string;
}
