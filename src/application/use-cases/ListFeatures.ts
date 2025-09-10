import type { FeatureRepo } from "@/domain/ports/FeatureRepo";

export async function ListFeatures(
  repo: FeatureRepo,
  params: { sort?: "top" | "trending" | "new"; userId?: string }
) {
  return repo.list(params);
}
