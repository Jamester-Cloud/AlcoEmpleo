import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
connect();
// this route works for updating the user password
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email: email });
    /// user not found
    if (!user) {
      return NextResponse.json(
        { error: "No se encontro usuario" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let filter, update;
    filter = { email: email };
    update = { password: hashedPassword };
    
    await User.updateOne(filter, update);

    return NextResponse.json(
      { message: "Usuario encontrado y actualizado" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
