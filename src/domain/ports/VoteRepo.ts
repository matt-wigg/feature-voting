export interface VoteRepo {
  toggle(
    featureId: string,
    userId: string
  ): Promise<{ votes: number; hasVoted: boolean }>;
}
