type DrugKey = 'name' | 'prescriptionDate' | 'actions';

interface AppTableColumn {
    key: DrugKey;
    title: string;
    render?: React.ComponentType<{ data: any }>;
}