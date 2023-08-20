import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface InitialState {
    alerts: string[],
    drugs: Drug[],
};

const initialState: InitialState = {
    alerts: [],
    drugs: [],
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        addDrug: (state, action: PayloadAction<Partial<Drug>>) => {
            state.drugs.push({ ...action.payload, id: uuidv4() } as Drug);
        },
        updateDrug: (state, action: PayloadAction<Partial<Drug>>) => {
            const drug = state.drugs.find(d => d.id === action.payload.id);
            if (drug) {
                Object.assign(drug, action.payload.changes);
            }
        },
        deleteDrug: (state, action: PayloadAction<string>) => {
            const newDrugs = state.drugs.filter(drug => drug.id !== action.payload);
            return { ...state, drugs: newDrugs }
        },
        setAlerts: (state, action: PayloadAction<string[]>) => {
            state.alerts = [...action.payload];
        },
    },
});

export const getAllAlerts = (state: RootState) => state.global.alerts;
export const getAllDrugs = (state: RootState) => state.global.drugs;
export const { addDrug, updateDrug, deleteDrug, setAlerts } = globalSlice.actions;
export default globalSlice.reducer;
