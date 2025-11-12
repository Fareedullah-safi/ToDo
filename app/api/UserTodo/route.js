import ConnectDB from "@/Lib/DB/DB";
import { NextResponse } from "next/server";
import UserTodo from "@/Lib/Models/UserTodo";

export async function POST(req) {
  try {
    await ConnectDB();
    const body = await req.json();
    const data = await UserTodo.create(body);
    return NextResponse.json(
      {
        status: true,
        message: "Data received successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500, message: "server issue", error });
  }
}
