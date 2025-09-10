import { CreateFeature } from "@/application/use-cases/CreateFeature";
import { ListFeatures } from "@/application/use-cases/ListFeatures";
import { ToggleVote } from "@/application/use-cases/ToggleVote";
import { PrismaFeatureRepo } from "@/infrastructure/repositories/PrismaFeatureRepo";
import { PrismaVoteRepo } from "@/infrastructure/repositories/PrismaVoteRepo";

export const FeatureController = {
  async list(params: { sort?: "top" | "trending" | "new"; userId?: string }) {
    return ListFeatures(PrismaFeatureRepo, params);
  },
  async create(input: {
    title: string;
    description: string;
    authorId?: string;
  }) {
    return CreateFeature(PrismaFeatureRepo, input);
  },
  async toggleVote(input: { featureId: string; userId: string }) {
    return ToggleVote(PrismaVoteRepo, input);
  },
};
