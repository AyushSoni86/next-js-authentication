import { connect } from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const user = await userModel.findOne({ _id: id }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
