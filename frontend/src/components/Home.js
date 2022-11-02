import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import usePersist from "../hooks/usePersist";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux/es/hooks/useDispatch";
import {useLoginMutation} from "../features/auth/authApiSlice";
import {setCredentials} from "../features/auth/authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const Home = () => {


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
        userRef.current.focus();
    }, []);

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
            errRef.current.focus();
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

                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <Container>
                    <Row>
                        <Col><h1 className="main-title prevent-select">LeoContact</h1></Col>
                    </Row>
                    <Row>
                        <Button className="login-btn" href="/login">
                            LOGIN
                        </Button>
                    </Row>

                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            className="form__input"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            className="form__input"
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                        <button className="form__submit-button">Sign In</button>

                        <label htmlFor="persist" className="form__persist">
                            <input
                                type="checkbox"
                                className="form__checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust This Device
                        </label>
                    </form>
                </Container>
            </main>
        </section>
    );
};

export default Home;