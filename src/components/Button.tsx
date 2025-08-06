import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive" | "custom";
}

export const Button = ({ variant = "default", className, style, ...props }: ButtonProps) => {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition shadow rounded-2xl";

  // Only handles layout and borders, DOES NOT include colors to allow easy overriding
  const variants = {
    default: "", // By default, no color classes are applied; users should pass them via className as needed.
    ghost: "bg-transparent hover:bg-white text-white hover:text-red-500 border border-white",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    custom: ""};

  return (
    <button
      className={clsx(base, variants[variant], className)}
      style={style}
      {...props}
    />
  );
};
