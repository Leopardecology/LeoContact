import {Col, Container, Row} from "react-bootstrap";

const Public = () => {
    const content = (
        <section className="public">
            <main>
                <Container className="title-container">
                    <Row>
                        <Col><h1 className="mainTitle">LeoContact</h1></Col>
                    </Row>
                </Container>
            </main>
            {/*<footer>*/}
            {/*    <Button href="/login">*/}
            {/*        User Login*/}
            {/*    </Button>*/}
            {/*</footer>*/}
        </section>

    );
    return content;
};

export default Public;