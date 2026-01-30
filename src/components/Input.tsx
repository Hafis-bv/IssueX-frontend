import clsx from "clsx";

interface InputProps {
  type: string;
  name?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  value?: string;
  onChange?: any;
  error: string | null;
}

export const Input = ({
  type = "text",
  name,
  placeholder,
  id,
  className,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={clsx("bg-[#22252D] rounded-2xl p-3 min-w-75", className)}
        name={name || ""}
        type={type}
        placeholder={placeholder || ""}
        id={id || ""}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  );
};
