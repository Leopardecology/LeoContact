import useAuth from "../hooks/useAuth";
import {Container, Col, Row} from "react-bootstrap";

const DashFooter = () => {
    const {status} = useAuth();

    return (
        <Container className={"footer prevent-select"}>
            <Row>
                <Col xs={12} className="text-end">
                    Status: {status}
                </Col>
            </Row>
        </Container>
    );
};
export default DashFooter;
