interface Drug {
    [key: string]: string;
    id: string;
    name: string;
    prescriptionDate: string; // toISOString()
    rxcuis: string;
}