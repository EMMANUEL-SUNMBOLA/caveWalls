import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // Lucide icons

/**
 * @typedef {Object} InputWrapperProps
 * @property {string} [placeholder] - placeholder text for the input
 * @property {string} [label] - Label text for the input
 * @property {string} [value] - Label text for the input
 * @property {function(string): void} setValue - Function to update the value
 * @property {string} [info] - Information text to display below the input
 * @property {boolean} [error=false] - Whether the input is in an error state
 * @property {React.ReactNode} [icon] - Icon to display in the input
 * @property {React.ReactNode} [actionBtn] - Button to display in the input
 * @property {boolean} [password=false] - Whether the input should be a password field
 * @property {string} [className] - Additional CSS classes
 * @property {string} [type] - Input type attribute
 * @property {Object} [props] - Additional props to pass to the input element
 */

/**
 * Custom Input component with optional label, icon, and password toggle
 * @param {InputWrapperProps} props - Component properties
 * @returns {JSX.Element} - Input component JSX
 */
export const Input = ({
  label,
  info,
  error = false,
  icon,
  password = false,
  actionBtn,
  className,
  type,
  value,
  setValue,
  // eslint-disable-next-line no-unused-vars
  setInfo,
  // eslint-disable-next-line no-unused-vars
  setError,
  ...props
}) => {
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(password);

  const MyEye = secure ? Eye : EyeOff;

  const btn = password ? (
    <MyEye className="w-5 h-5 text-gray-500" />
  ) : (
    actionBtn
  );

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}

      <div
        className={cn(
          "relative w-full",
          focus ? "ring-2 ring-blue-400" : "",
          error ? "ring-2 ring-red-500" : "",
        )}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}

        <BaseInput
          {...props}
          value={value}
          type={password && secure ? "password" : type}
          onChange={(e) => {
            if (typeof setValue === "function") {
              setValue(e.target.value);
            } else {
              props.onChange?.(e);
            }
          }}
          className={cn(
            "pl-12 pr-12 py-2", // space for icon and button
            focus ? "border-blue-400" : "border-gray-300",
            error ? "border-red-500" : "",
            className,
          )}
          onFocus={(e) => {
            setFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            props.onBlur?.(e);
          }}
        />

        {btn && password && (
          <button
            type="button"
            onClick={() => setSecure(!secure)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {btn}
          </button>
        )}
      </div>

      {info && (
        <span
          className={cn("text-xs", error ? "text-red-500" : "text-gray-500")}
        >
          {info}
        </span>
      )}
    </div>
  );
};

/**
 * Base input component with default styling
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type] - Input type attribute
 * @param {Object} [props.props] - Additional props to pass to the input element
 * @returns {JSX.Element} - Base input component JSX
 */
function BaseInput({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-white px-8 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}
