import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

export default function MarketingPage() {
  return (
    <section className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          What to Build: Feature Voting
        </h1>
        <p className="text-muted-foreground text-balance">
          Post ideas, upvote favorites, and see what rises to the top.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/dashboard/features">
            <Button className="w-full sm:w-auto">
              Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a
            href="https://github.com/matt-wigg/feature-voting"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full sm:w-auto">
              View on GitHub
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" /> Post Features
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Share your idea with a title and description. Others can upvote and
            discuss.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" /> Vote & Sort
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Sort by Top, Trending, or New to discover what matters now.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
