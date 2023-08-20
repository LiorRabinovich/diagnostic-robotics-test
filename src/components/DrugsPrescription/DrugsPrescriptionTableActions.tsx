import React from 'react';
import AppButton from '@/components/AppButton/AppButton';
import { useDispatch } from 'react-redux';
import { deleteDrug } from '@/store/slices/globalSlice';

interface DrugsPrescriptionTableProps {
    data: any;
}

const DrugsPrescriptionTable: React.FC<DrugsPrescriptionTableProps> = React.memo(({ data }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(deleteDrug(data.id));
    };

    return (
        <div className="actions">
            <AppButton onClick={onDelete}>Delete</AppButton>
        </div>
    );
});

export default DrugsPrescriptionTable;
