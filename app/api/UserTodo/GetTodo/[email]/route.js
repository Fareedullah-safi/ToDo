import ConnectDB from "@/Lib/DB/DB";
import UserTodo from "@/Lib/Models/UserTodo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectDB();
    const { email } = await params;
    if (email) {
      const FindTodo = await UserTodo.find({ email });
      return NextResponse.json({ status: 201, message: "Todo Founded Successfull", FindTodo });
    }
    return NextResponse.json({ status: 404, message: "email not found" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server issue", error });
  }
}
