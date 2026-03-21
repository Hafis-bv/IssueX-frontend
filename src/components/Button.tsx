import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx("bg-primary rounded-2xl cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
