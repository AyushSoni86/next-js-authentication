import { connect } from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not found" },
        { status: 400 }
      );
    }
    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return NextResponse.json(
        { error: "check y our credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Logged in Successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
