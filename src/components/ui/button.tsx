import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  size?: "small" | "normal" | "large";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  size = "normal",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-3 font-medium rounded-[5px] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1";

  const containedStyles =
    "bg-slate-900 text-white hover:bg-slate-700 focus:ring-indigo-500 shadow-md";
  const outlinedStyles =
    "bg-transparent text-slate-900 border-[1px] border-slate-300 hover:bg-slate-50 focus:ring-slate-500";

  let variantClasses;
  switch (variant) {
    case "contained":
      variantClasses = containedStyles;
      break;
    case "outlined":
      variantClasses = outlinedStyles;
      break;
    default:
      variantClasses = containedStyles;
  }

  let sizeClasses;
  switch (size) {
    case "small":
      sizeClasses = "px-3 py-1.5 text-xs";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-base sm:text-lg";
      break;
    case "normal":
      sizeClasses = "px-4 py-2 text-sm";
      break;
    default:
      sizeClasses = "px-4 py-2 text-sm";
      break;
  }

  const classes = [baseStyles, variantClasses, sizeClasses, className]
    .join(" ")
    .trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
