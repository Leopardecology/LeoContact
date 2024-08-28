import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useTitle from '../../hooks/useTitle';

const Welcome = () => {

    const {username, isAdmin} = useAuth();

    useTitle('LeoContacts - Welcome');

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-DE', {
        dateStyle: 'full',
        timeStyle: 'short'
    }).format(date);

    return (
        <section className="welcome">

            <main className="welcome-page">
                <Container>

                    <Row>
                        <Col>
                            <h2 className="welcome-subtitle">Hello {username}!</h2>
                        </Col>
                    </Row>
                    <Row>
                        <p>{today}</p>
                    </Row>
                    <Row>
                        <Col sm="auto">
                            <Link to="/dash/contacts">
                                <Button
                                    className="welcome-btn">Contacts</Button>
                            </Link>
                        </Col>
                        {isAdmin && <Col sm="auto">
                            <Link to="/dash/contacts/select">
                                <Button className="welcome-btn">Select
                                    Contact</Button>
                            </Link>
                        </Col>}
                        {isAdmin && <Col sm="auto">
                            <Link to="/dash/users">
                                <Button className="welcome-btn">Users</Button>
                            </Link>
                        </Col>}
                    </Row>

                </Container>
            </main>
        </section>
    )
        ;
};

export default Welcome;