import {Button, Col, Container, Row, Modal, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import usePersist from "../hooks/usePersist";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {useLoginMutation} from "../features/auth/authApiSlice";
import {setCredentials} from "../features/auth/authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const Home = () => {


    //Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Login
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setError] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    useEffect(() => {
        setError('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {accessToken} = await login({username, password}).unwrap();
            dispatch(setCredentials({accessToken}));
            setUsername('');
            setPassword('');
            navigate('/dash');
        } catch (err) {
            if (!err.status) {
                setError('No Server Response');
            } else if (err.status === 400) {
                setError('Missing Username or Password');
            } else if (err.status === 401) {
                setError('Wrong Username or Password');
            } else {
                setError(err.data?.message);
            }
        }
    };

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist(prev => !prev);

    const errClass = errMsg ? "error" : "offscreen";

    if (isLoading) return <PulseLoader color={"#FFF"}/>;

    return (
        <section className="public">
            <main className="home-page">
                <Container>
                    <Row>
                        <Col><h1 className="main-title prevent-select">LeoContact</h1></Col>
                    </Row>
                    <Row>
                        <Button className="login-btn" onClick={handleShow}>
                            LOGIN
                        </Button>
                    </Row>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Leo Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username"
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            value={username}
                                            onChange={handleUserInput}
                                            autoComplete="off">
                                    <Form.Control type="text" placeholder="Username"/>
                                </Form.Group>
                            </Form>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="password"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={handlePwdInput}>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Form.Group className="form-checkbox" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox"
                                            label="Trust This Device"
                                            id="persist"
                                            onChange={handleToggle}
                                            checked={persist}/>
                            </Form.Group>

                            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                            <Button type="submit" variant="primary" onClick={handleSubmit}>LOGIN</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </main>
        </section>
    );
};

export default Home;