import { prisma } from "../db/prisma";
import type { VoteRepo } from "@/domain/ports/VoteRepo";

export const PrismaVoteRepo: VoteRepo = {
  async toggle(featureId, userId) {
    // Ensure the user exists (satisfy FK to User.id)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `${userId}@example.com`, // email is required & unique
        name: "Demo User",
        // role uses default('user')
      },
    });

    // Toggle the vote
    const key = { userId_featureId: { userId, featureId } };
    const existing = await prisma.vote.findUnique({ where: key });

    if (existing) {
      await prisma.vote.delete({ where: key });
    } else {
      await prisma.vote.create({ data: { userId, featureId } });
    }

    const votes = await prisma.vote.count({ where: { featureId } });
    return { votes, hasVoted: !existing };
  },
};
