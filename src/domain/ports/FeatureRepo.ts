import type { Feature, FeatureStatus } from "@/domain/entities/Feature";

export interface FeatureRepo {
  create(input: {
    title: string;
    description: string;
    authorId?: string;
  }): Promise<Feature>;
  list(params: {
    sort?: "top" | "trending" | "new";
    userId?: string;
  }): Promise<Feature[]>;
  get(id: string, userId?: string): Promise<Feature | null>;
  updateStatus(id: string, status: FeatureStatus): Promise<Feature>;
}
