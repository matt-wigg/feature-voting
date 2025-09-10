"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateFeatureSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
});

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function createFeatureAction(input: unknown) {
  const parsed = CreateFeatureSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Validation failed");
  }
  const res = await fetch(`${BASE}/api/features`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || "Failed to create feature");
  }
  const data = await res.json();
  revalidatePath("/dashboard/features");
  return data;
}

export async function toggleVoteAction(featureId: string) {
  if (!featureId) throw new Error("featureId required");
  const res = await fetch(`${BASE}/api/features/${featureId}/vote`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(err || "Failed to toggle vote");
  }
  return (await res.json()) as { id: string; votes: number; hasVoted: boolean };
}

export async function listFeaturesAction(
  params: { sort?: "top" | "trending" | "new" } = {}
) {
  const q = new URLSearchParams({ sort: params.sort ?? "top" });
  const res = await fetch(`${BASE}/api/features?${q.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to list features");
  return (await res.json()).items as any[];
}
