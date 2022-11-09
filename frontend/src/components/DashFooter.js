import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import {Container} from "react-bootstrap";

const DashFooter = () => {

    const {status} = useAuth();

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse}/>
            </button>
        );
    }

    return (
        <Container className="footer prevent-select">
            <footer>
                {goHomeButton}
                <p>Status: {status}</p>
            </footer>
        </Container>
    );
};
export default DashFooter;