import { useSelector } from "react-redux";
import { getAllAlerts } from "@/store/slices/globalSlice";
import AppAlert from "@/components/AppAlert/AppAlert";


export default function DrugsPrescriptionAlerts() {
    const allAlerts = useSelector(getAllAlerts);

    return (
        <div className="drugs-prescription-alerts">
            {allAlerts.map((alert) => (
                <AppAlert key={alert}>{alert}</AppAlert>
            ))}
        </div>
    )
}