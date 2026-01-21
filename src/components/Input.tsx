import clsx from "clsx";

interface InputProps {
  type: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: () => void;
}

export const Input = ({
  type = "text",
  placeholder,
  id,
  className,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      className={clsx("bg-[#22252D] rounded-2xl p-3 min-w-75", className)}
      type={type}
      placeholder={placeholder || ""}
      id={id || ""}
      value={value}
      onChange={onChange}
    />
  );
};
