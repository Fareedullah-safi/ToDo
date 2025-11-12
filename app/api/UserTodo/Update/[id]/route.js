import ConnectDB from "@/Lib/DB/DB";
import UserTodo from "@/Lib/Models/UserTodo";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await ConnectDB();
  const { id } = await params;
  const { completed } = await req.json();
  console.log(completed);

  const updatedTodo = await UserTodo.findByIdAndUpdate(id, { completed }, { new: true });

  if (!updatedTodo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Todo updated", updatedTodo }, { status: 201 });
}
