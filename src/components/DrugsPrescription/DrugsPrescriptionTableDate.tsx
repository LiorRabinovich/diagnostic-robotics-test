import React from 'react';
import { useDispatch } from 'react-redux';
import AppDatePicker from '../AppDatePicker/AppDatePicker';
import { updateDrug } from '@/store/slices/globalSlice';

interface DrugsPrescriptionTableDateProps {
    data: any;
}

const DrugsPrescriptionTableDate: React.FC<DrugsPrescriptionTableDateProps> = React.memo(({ data }) => {
    const dispatch = useDispatch();

    const onDateChange = (date: string) => {
        dispatch(updateDrug({
            ...data, prescriptionDate: date
        }));
    };

    return (
        <div className="actions">
            <AppDatePicker defaultValue={data.prescriptionDate} onDateChange={onDateChange} />
        </div>
    );
});

export default DrugsPrescriptionTableDate;
