import './Card.css'

function Card(props) {
    const classes = 'card ' + props.className;
    return (  
        <div className={classes} style={props.style}>
            {props.children}
        </div>
    );
}

export default Card;