import React, { useState } from 'react';

interface AppDatePickerProps {
    defaultValue?: string;
    onDateChange: (date: string) => void;
}

const AppDatePicker: React.FC<AppDatePickerProps> = React.memo(({ defaultValue, onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState((defaultValue || new Date().toISOString()).split('T')[0]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        onDateChange(new Date(e.target.value).toISOString());
    };

    return (
        <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleChange}
            className="p-2 border rounded"
        />
    );
});

export default AppDatePicker;
