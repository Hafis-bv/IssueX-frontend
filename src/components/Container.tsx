import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const Container = ({ children, className, id }: ContainerProps) => {
    return (
        <div className={clsx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} id={id || ''}>
            {children}
        </div>
    )
}