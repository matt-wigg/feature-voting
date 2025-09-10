import { FeatureList } from "@/components/features/feature-list";
import { FeatureController } from "@/interface/controllers/FeatureController";
import { FeaturePresenter } from "@/interface/presenters/FeaturePresenter";

export const dynamic = "force-dynamic";

export default async function FeaturesPage({
  searchParams,
}: {
  // Next.js 15+: searchParams is a Promise in Server Components
  searchParams: Promise<{ sort?: "top" | "trending" | "new" }>;
}) {
  const sp = await searchParams;
  const sort = (sp?.sort as any) ?? "top";

  const features = await FeatureController.list({ sort, userId: "demo_user" });
  const items = FeaturePresenter.presentList(features);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <FeatureList initialItems={items} />
    </div>
  );
}
