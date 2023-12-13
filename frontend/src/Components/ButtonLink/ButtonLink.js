import { Link } from "react-router-dom";
import "./ButtonLink.css";

function ButtonLink(props){
    const { btnLink, btnText, btnClassName, fa_Icon } = props;

    return(
        <Link to={btnLink} className={btnClassName}>
            {fa_Icon !== undefined && <i className={fa_Icon} />}
            {btnText}
        </Link>
    );
}

export default ButtonLink;