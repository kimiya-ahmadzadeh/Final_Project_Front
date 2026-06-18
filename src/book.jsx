import { useParams } from "react-router-dom";

export function Book() {
    const {title} = useParams();
    return (
        <div>TITLEEEEE  {title}</div>
    );
}