import type { FeatureRepo } from "@/domain/ports/FeatureRepo";

export async function CreateFeature(
  repo: FeatureRepo,
  input: { title: string; description: string; authorId?: string }
) {
  return repo.create(input);
}
