"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateFeatureDialog } from "./new-feature-dialog";
import { FeatureCard } from "./feature-card";
import type { Feature } from "@/domain/entities/Feature";

type SortKey = "top" | "trending" | "new";

export function FeatureList({ initialItems }: { initialItems: Feature[] }) {
  const [items, setItems] = useState<Feature[]>(initialItems);
  const [sort, setSort] = useState<SortKey>("top");

  const sorted = useMemo(() => {
    const copy = [...items];
    switch (sort) {
      case "new":
        return copy.sort((a, b) =>
          String(a.createdAt ?? a.id) < String(b.createdAt ?? b.id) ? 1 : -1
        );
      case "trending":
        return copy.sort((a, b) => b.votes - a.votes);
      case "top":
      default:
        return copy.sort((a, b) => b.votes - a.votes);
    }
  }, [items, sort]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <TabsList className="grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="sm:ml-auto">
          <CreateFeatureDialog
            onCreated={(f) =>
              setItems((prev) => [{ ...f, votes: 0, hasVoted: false }, ...prev])
            }
          />
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3 sm:gap-4">
        {sorted.map((f) => (
          <FeatureCard
            key={f.id}
            feature={f}
            onToggleVote={(updated) =>
              setItems((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              )
            }
          />
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No features yet. Be the first to add one!
          </p>
        )}
      </div>
    </div>
  );
}
