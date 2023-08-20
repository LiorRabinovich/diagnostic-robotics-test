import { useCallback, FormEvent, useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { useLazySearchDrugsQuery } from '@/store/slices/drugApiSlice';
import AppComboBox from '@/components/AppComboBox/AppComboBox';
import { useDispatch } from 'react-redux';
import { addDrug } from '@/store/slices/globalSlice';
import AppButton from '../AppButton/AppButton';

export default function DrugsPrescriptionForm() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isComboboxLoading, setIsComboboxLoading] = useState<boolean>(true);
    const [selectedDrug, setSelectedDrug] = useState<Partial<Drug>>({});
    const [fetchSearchDrugs, drugsResponse] = useLazySearchDrugsQuery();
    const [, drugsNames = [], deugsMetaData = {}] = drugsResponse?.data || [];

    useEffect(() => {
        setIsComboboxLoading(drugsResponse?.isFetching);
    }, [drugsResponse]);

    const onSearchDrugs = useCallback(_debounce((term: string) => {
        if (!term) return;
        fetchSearchDrugs(term, true);
    }, 300), [fetchSearchDrugs]);

    const onSelectDrug = useCallback((drugIndex: number) => {
        setSelectedDrug({
            name: drugsNames[drugIndex],
            rxcuis: deugsMetaData?.RXCUIS?.[drugIndex] || null,
            prescriptionDate: new Date().toISOString(),
        });
    }, [drugsNames, deugsMetaData]);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedDrug?.name) return;
        dispatch(addDrug(selectedDrug));
        setSelectedDrug({});
        setSearchTerm('');
    }

    return (
        <form className="drugs-prescription-form flex gap-2 my-4" onSubmit={onSubmit}>
            <AppComboBox
                searchTerm={searchTerm}
                loading={isComboboxLoading}
                setSearchTerm={setSearchTerm}
                onSearch={onSearchDrugs}
                onSelect={onSelectDrug}
                items={drugsNames}
            />
            <AppButton type="submit">Add Drug</AppButton>
        </form>
    );
}
