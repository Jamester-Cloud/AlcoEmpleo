import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";

connect();
/**
 * This endpoint just get a candidate data
 */
export async function POST(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas
    const reqJson = await request.json();

    const candidato: any = await Candidato.findOne({
      _id: reqJson.id,
    });
    const response = NextResponse.json({
      message: "Succesfull data retrieving",
      success: true,
      candidate: candidato,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error + " and error is:" + error.message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
