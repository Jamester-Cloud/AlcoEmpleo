import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        
        const token:any = request.cookies.getAll() || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        return {
            id: decodedToken.id,
            idPersona : decodedToken.idPersona,
            idRol:decodedToken.rol
        }

    } catch (error: any) {
        throw new Error(error.message);
    }

}