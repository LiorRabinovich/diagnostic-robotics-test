import { useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrugs, setAlerts } from '@/store/slices/globalSlice';
import { useLazyCheckInteractionsQuery } from '@/store/slices/drugApiSlice';
import DrugsPrescriptionForm from '@/components/DrugsPrescription/DrugsPrescriptionForm';
import DrugsPrescriptionTable from '@/components/DrugsPrescription/DrugsPrescriptionTable';
import DrugsPrescriptionAlerts from '@/components/DrugsPrescription/DrugsPrescriptionAlerts';


export default function DrugsPrescription() {
    const dispatch = useDispatch();
    const [fetchCheckInteractions, checkInteractionsResponse] = useLazyCheckInteractionsQuery();
    const allDrugs = useSelector(getAllDrugs);

    useEffect(() => {
        const rxcuis = allDrugs.flatMap(drug => drug.rxcuis).join('+');
        if (!rxcuis) return;
        fetchCheckInteractions(rxcuis, true);
    }, [allDrugs]);

    useEffect(() => {
        if (!checkInteractionsResponse?.data) return;
        const alerts: Set<string> = new Set();

        checkInteractionsResponse.data?.fullInteractionTypeGroup?.forEach((item: any) => {
            item?.fullInteractionType?.forEach((fit: any) => {
                fit?.interactionPair?.forEach(({ description }: any) => {
                    if (description) {
                        alerts.add(description);
                    }
                });
            }, [])
        })

        dispatch(setAlerts(Array.from(alerts)));
    }, [checkInteractionsResponse]);

    return (
        <div className="drugs-prescription">
            <header>
                <h2 className="text-lg mb-2">Drugs Prescription</h2>
            </header>

            <main>
                <DrugsPrescriptionAlerts />
                <DrugsPrescriptionForm />
                <DrugsPrescriptionTable />
            </main>
        </div>
    )
}