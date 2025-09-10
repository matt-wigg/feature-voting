import { NextResponse } from "next/server";
import { FeatureController } from "@/interface/controllers/FeatureController";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const userId = "demo_user"; // TODO: replace with session
  const { votes, hasVoted } = await FeatureController.toggleVote({
    featureId: id,
    userId,
  });

  return NextResponse.json({ id, votes, hasVoted });
}
