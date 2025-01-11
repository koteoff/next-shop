import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const firms = await prisma.firm.findMany();

  return NextResponse.json(firms);
}
