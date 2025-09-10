import type { VoteRepo } from "@/domain/ports/VoteRepo";

export async function ToggleVote(
  repo: VoteRepo,
  input: { featureId: string; userId: string }
) {
  return repo.toggle(input.featureId, input.userId);
}
