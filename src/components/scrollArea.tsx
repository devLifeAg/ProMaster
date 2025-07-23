import { clsx } from "clsx";

export const ScrollArea = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded", className)}
    {...props}
  />
);
