import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import {Container, Col, Row} from "react-bootstrap";

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
        <Container className={"footer fixed-bottom prevent-select"}>
            <Row>
                <Col>Status: {status}</Col>
                <Col>{goHomeButton}</Col>
            </Row>
        </Container>
    );
};
export default DashFooter;