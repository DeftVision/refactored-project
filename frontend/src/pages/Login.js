import {useState, useContext} from "react";
import {Container, Form, FloatingLabel, Button, Card, Row, Col} from "react-bootstrap";
import UserContext from "../components/UserContext";
import cookies from "js-cookie";
import {Link} from 'react-router-dom';

const form_default = {
    email: "",
    password: "",
};

export default function Login() {
    const [form, setForm] = useState(form_default);
    const [message, setMessage] = useState(null);
    const {setUser} = useContext(UserContext);
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setValidated(true);
        const _response = await response.json();

        if (response.ok && _response.user) {
            const userId = _response.user._id;
            cookies.set("userCookie", userId);
            setUser(_response.user);
        } else {
            console.log(_response.error);
            return setMessage(_response.message);
        }
    };

    return (
        <Container style={{width: "60%"}}>
            <Card className="shadow mt-5 mb-5">
                <Card.Header>
                    <h5 style={{textAlign: "center"}}>Login</h5>
                </Card.Header>

                <Card.Body>

                    <Card.Text>
                        <p style={{color: "#ab0a0a", textAlign: "center", marginBlockStart: "auto"}}>{message}</p>
                    </Card.Text>


                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>

                            <FloatingLabel controlid='email' label='Email' className='mb-4'>
                                <Form.Control
                                    required
                                    type='email'
                                    autoComplete="current-email"
                                    value={form.email}
                                    placeholder=''
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </FloatingLabel>


                            <FloatingLabel controlid='password' label='Password' className='mb-4'>
                                <Form.Control
                                    required
                                    type='password'
                                    autoComplete="current-password"
                                    value={form.password}
                                    placeholder=''
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </FloatingLabel>

                            <div>
                                <Button onClick={handleSubmit} type='submit' variant={"btn btn-outline-primary"}
                                        className="mb-4">
                                    login
                                </Button>
                            </div>
                            <div>
                                <Button as={Link} to="/forgotpassword" variant={"btn btn-outline-secondary"}>
                                    Need help signing in?
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    );
}
