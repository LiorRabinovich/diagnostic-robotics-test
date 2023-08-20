import React from 'react';

interface AppAlertProps {
    children: React.ReactNode;
};

const AppAlert: React.FC<AppAlertProps> = React.memo(({ children }) => {
    return (
        <div className="flex justify-between items-center text-white py-2 px-4 rounded bg-red-500 mb-2">
            {children}
        </div>
    );
});

export default AppAlert;
