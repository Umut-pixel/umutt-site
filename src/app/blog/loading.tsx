import { Separator } from "@/components/ui/separator";

export default function BlogLoading() {
  return (
    <div className="flex flex-col space-y-8 animate-pulse">
      <div className="h-8 w-20 rounded-md bg-muted" />
      <div className="space-y-3">
        <div className="h-6 w-16 rounded-lg bg-muted" />
        <div className="h-10 w-48 rounded-md bg-muted" />
        <div className="h-4 w-full max-w-md rounded-md bg-muted" />
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square w-full rounded-xl bg-muted" />
            <div className="h-4 w-3/4 rounded-md bg-muted" />
            <div className="h-3 w-1/3 rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
