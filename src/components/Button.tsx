import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive" | "custom";
}

export const Button = ({ variant = "default", className, style, ...props }: ButtonProps) => {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition shadow rounded-2xl";

  // Chỉ xử lý layout và viền thôi, KHÔNG dính đến màu sắc để dễ override
  const variants = {
    default: "", // Mặc định là để trống để người dùng tự truyền màu qua className
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
