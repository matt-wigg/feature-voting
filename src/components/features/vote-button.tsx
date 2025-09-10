"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Feature } from "@/domain/entities/Feature";
import { toggleVoteAction } from "@/app/actions/feature-actions";

export function VoteButton({
  feature,
  onChange,
}: {
  feature: Feature;
  onChange: (f: Feature) => void;
}) {
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    setPending(true);
    try {
      const res = await toggleVoteAction(feature.id);
      onChange({ ...feature, votes: res.votes, hasVoted: res.hasVoted });
    } finally {
      setPending(false);
    }
  };

  const pressed = !!feature.hasVoted;

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={toggle}
        disabled={pending}
        variant={pressed ? "secondary" : "default"}
        className="min-w-[96px]"
        aria-pressed={pressed}
        aria-label={pressed ? "Remove vote" : "Add vote"}
      >
        {pressed ? "Unvote" : "Upvote"}
      </Button>
      <span className="text-sm tabular-nums" aria-live="polite">
        {feature.votes}
      </span>
    </div>
  );
}
