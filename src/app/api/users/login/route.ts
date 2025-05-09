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
      return NextResponse.json({ error: "User not Found" }, { status: 400 });
    }
    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "User not Verified" }, { status: 400 });
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
