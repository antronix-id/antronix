import { RipplePulseLoader } from "@/components/ui/ripple-pulse-loader";

export default function Loading() {
  return (
    <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-200 pointer-events-none select-none">
      <RipplePulseLoader />
    </div>
  );
}
