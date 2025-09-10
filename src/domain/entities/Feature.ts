export type FeatureStatus =
  | "open"
  | "planned"
  | "in_progress"
  | "done"
  | "archived";

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  votes: number;
  hasVoted?: boolean; // domain keeps it optional; UI normalizes with !!
  authorId?: string;
  createdAt?: Date;
}
