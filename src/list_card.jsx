import "../styles/list_card.css";

export function ListCard(props) {

    return (
        <div className="card-content" /*onClick={() => navigate(`/book/${props.list.name}`)}*/>
            <div className="list-card-name">{props.list.name}</div>
            <div className="list-card-desc">{props.list.description}</div>
        </div>
    )
}