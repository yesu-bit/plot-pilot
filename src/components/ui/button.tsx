import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  children,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const containedStyles =
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md";
  const outlinedStyles =
    "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500";

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

  const classes = `${baseStyles} ${variantClasses}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
