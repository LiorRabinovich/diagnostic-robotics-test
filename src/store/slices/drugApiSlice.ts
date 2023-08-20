import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const drugApiSlice = createApi({
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        searchDrugs: builder.query<any, string>({
            query: (term: string) => {
                return `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${term}&ef=RXCUIS`;
            },
        }),
        checkInteractions: builder.query<any, string>({
            query: (codes: string) => {
                return `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${codes}`;
            },
        }),
    }),
});

export const { useLazySearchDrugsQuery, useLazyCheckInteractionsQuery } = drugApiSlice;
