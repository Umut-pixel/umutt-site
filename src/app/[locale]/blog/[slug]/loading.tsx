import { Separator } from "@/components/ui/separator";

export default function BlogPostLoading() {
  return (
    <div className="flex flex-col space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-8 w-24 rounded-md bg-muted" />
        <div className="h-4 w-64 rounded-md bg-muted" />
      </div>
      <div className="space-y-3">
        <div className="h-10 w-full max-w-lg rounded-md bg-muted" />
        <div className="h-4 w-40 rounded-md bg-muted" />
        <div className="h-4 w-full max-w-md rounded-md bg-muted" />
      </div>
      <div className="aspect-square w-full max-w-[480px] rounded-xl bg-muted" />
      <Separator />
      <div className="space-y-3">
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-11/12 rounded-md bg-muted" />
        <div className="h-4 w-4/5 rounded-md bg-muted" />
      </div>
    </div>
  );
}
