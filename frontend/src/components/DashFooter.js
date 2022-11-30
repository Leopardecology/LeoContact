import useAuth from "../hooks/useAuth";
import {Container, Col, Row} from "react-bootstrap";

const DashFooter = () => {

    const {status} = useAuth();

    return (
        <Container className={"footer fixed-bottom prevent-select"}>
            <Row>
                <Col>Status: {status}</Col>
            </Row>
        </Container>
    );
};
export default DashFooter;