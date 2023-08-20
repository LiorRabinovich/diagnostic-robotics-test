import _debounce from 'lodash/debounce';
import React, { ReactNode, MouseEvent } from 'react';

interface AppButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const AppButton: React.FC<AppButtonProps> = React.memo(({ type, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded">{children}</button>
    );
});

export default AppButton;
