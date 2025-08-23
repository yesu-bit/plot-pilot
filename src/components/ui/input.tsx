import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
}

export default function Input({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      id={id || name}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      className={`w-full px-2 border border-slate-300 rounded-[6px] py-1.5 text-[15px] ${className}`}
      {...props}
    />
  );
}
