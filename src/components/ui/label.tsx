import React from "react";

// Define the props for our Label component
interface LabelProps {
  text: string;
  htmlFor?: string; // Optional 'for' attribute to associate the label with an input
  className?: string; // Optional custom className for additional styling
}

/**
 * A reusable and customizable Label component.
 *
 * @param {string} text - The text content of the label.
 * @param {string} [htmlFor] - The ID of the form element the label is for.
 * @param {string} [className] - Optional custom CSS classes.
 */
const Label: React.FC<LabelProps> = ({ text, htmlFor, className = "" }) => {
  const baseStyles = "block text-sm font-medium text-gray-800";
  const combinedStyles = `${baseStyles} ${className}`.trim();

  return (
    <label htmlFor={htmlFor} className={combinedStyles}>
      {text}
    </label>
  );
};

export default Label;
