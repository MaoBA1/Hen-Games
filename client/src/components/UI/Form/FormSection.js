import './FormSection.css'



function FormSection(props) {
  const classes = `${props.direction === "row" ? 'section__row' : "section__col"} ${props.className}`;
  return <div className={classes}>{props.children}</div>;
}

export default FormSection;

