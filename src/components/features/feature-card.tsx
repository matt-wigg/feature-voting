"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VoteButton } from "./vote-button";
import type { Feature } from "@/domain/entities/Feature";

export function FeatureCard({
  feature,
  onToggleVote,
}: {
  feature: Feature;
  onToggleVote: (f: Feature) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base sm:text-lg leading-snug">
            {feature.title}
          </CardTitle>
          <div className="text-xs text-muted-foreground">ID: {feature.id}</div>
        </div>
        <Badge
          variant="secondary"
          className="self-start sm:self-auto capitalize"
        >
          {feature.status.replaceAll("_", " ")}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground sm:pr-6">
          {feature.description}
        </p>
        <div className="sm:self-end">
          <VoteButton feature={feature} onChange={onToggleVote} />
        </div>
      </CardContent>
    </Card>
  );
}
