import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useTitle from '../../hooks/useTitle';

const Welcome = () => {

    const {username, isAdmin} = useAuth();

    useTitle('LeoContacts - Welcome');

    const date = new Date();
    const today = new Intl.DateTimeFormat('de-DE', {dateStyle: 'full', timeStyle: 'long'}).format(date);

    return (
        <section className="welcome">

            <main className="welcome-page">
                <Container>
                    <Row>
                        <Col>
                            <p>{today}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2 className="welcome-subtitle">Hello {username}!</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/dash/contacts">
                                <Button className="welcome-btn">Contacts</Button>
                            </Link>
                        </Col>
                    </Row>
                    {(isAdmin) && <Row>
                        <Col>
                            <Link to="/dash/users">
                                <Button className="welcome-btn">Users</Button>
                            </Link>
                        </Col>
                    </Row>}
                </Container>
            </main>
        </section>
    );
};

export default Welcome;