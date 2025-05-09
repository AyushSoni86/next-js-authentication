import { connect } from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const user = await userModel.findOne({ _id: id }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
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
