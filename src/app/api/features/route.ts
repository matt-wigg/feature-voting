import { NextResponse } from "next/server";
import { z } from "zod";
import { FeatureController } from "@/interface/controllers/FeatureController";
import { FeaturePresenter } from "@/interface/presenters/FeaturePresenter";

const CreateFeatureSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sort =
    (searchParams.get("sort") as "top" | "trending" | "new") ?? "top";
  const userId = searchParams.get("userId") ?? "demo_user"; // TODO: session
  const items = await FeatureController.list({ sort, userId });
  return NextResponse.json({ items: FeaturePresenter.presentList(items) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parse = CreateFeatureSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { errors: parse.error.flatten() },
      { status: 422 }
    );
  }
  const created = await FeatureController.create({ ...parse.data });
  return NextResponse.json(created, { status: 201 });
}
