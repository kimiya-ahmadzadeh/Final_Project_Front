import { CircularProgress } from '@mui/material';
import "../styles/loading.css";

export function Loading() {
    return (
        <div className="loading">
            <CircularProgress color='gray' />
        </div>
    );
}