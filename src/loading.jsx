import { CircularProgress } from '@mui/material';

export function Loading() {
    return (
        <div className="loading">
            <CircularProgress color='gray'/>
        </div>
    )
}