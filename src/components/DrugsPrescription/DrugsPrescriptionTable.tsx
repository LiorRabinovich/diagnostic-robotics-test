import { useSelector } from 'react-redux';
import { getAllDrugs } from '@/store/slices/globalSlice';
import AppTable from '@/components/AppTable/AppTable';
import DrugsPrescriptionTableDate from './DrugsPrescriptionTableDate';
import DrugsPrescriptionTableActions from './DrugsPrescriptionTableActions';

const columns: AppTableColumn[] = [
    { key: 'name', title: 'Drug Name' },
    { key: 'prescriptionDate', title: 'Prescription Date', render: DrugsPrescriptionTableDate },
    { key: 'actions', title: 'Actions', render: DrugsPrescriptionTableActions },
];

export default function DrugsPrescriptionTable() {
    const allDrugs = useSelector(getAllDrugs);

    return (
        <AppTable columns={columns} data={allDrugs} />
    );
}
