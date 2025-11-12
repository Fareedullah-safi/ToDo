import UserTodo from "@/Lib/Models/UserTodo";
import ConnectDB from "@/Lib/DB/DB";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await ConnectDB();
    const { id } = await params;
    if (id) {
      const deleteTodo = await UserTodo.findByIdAndDelete(id);
      return NextResponse.json({ status: 201, message: "Todo Finded success", deleteTodo });
    }
  } catch (error) {
    console.log(error);
  }
}
