import { connect } from "@/dbConfig/dbConfig";
import { userModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendmail } from "@/utils/mailer";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    await sendmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "Reset password email sent successfully", success: true },
      { status: 200 }
    );
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
