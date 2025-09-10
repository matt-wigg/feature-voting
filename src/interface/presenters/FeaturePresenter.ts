import type { Feature } from "@/domain/entities/Feature";

export const FeaturePresenter = {
  presentList(list: Feature[]) {
    return list.map((f) => ({
      ...f,
      hasVoted: !!f.hasVoted, // normalize optional -> boolean
    }));
  },
  presentOne(f: Feature | null) {
    if (!f) return null;
    return { ...f, hasVoted: !!f.hasVoted };
  },
};
