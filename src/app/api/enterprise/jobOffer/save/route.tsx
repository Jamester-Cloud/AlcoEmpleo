import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import OfertaTrabajo from '@/models/ofertaTrabajo'
connect()

export async function POST(request: NextRequest) {
    const reqJson =  await request.json()
}