import {Button, Col, Container, Row} from "react-bootstrap";

const Public = () => {
    return (
        <section className="public start-page">
            <Container>
                <Row>
                    <Col><h1 className="main-title prevent-select">LeoContact</h1></Col>
                </Row>
                <Row>
                    <Button className="login-btn" href="/login">
                        LOGIN
                    </Button>
                </Row>
            </Container>
        </section>

    );
};

export default Public;