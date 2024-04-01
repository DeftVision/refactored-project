import {Col, Card, Container, Form, Button, FloatingLabel} from 'react-bootstrap';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const form_default = {
    email: "",
}

export default function ForgotPassword() {
    const [form, setForm] = useState(form_default);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate("/login");
    }

    function handleSubmit() {
        setValidated(true);
    }

    return (
        <Container style={{width: "60%"}}>
            <Col>
                <Card className="shadow mt-5 mb-5">
                    <Card.Header>
                        <h5 style={{textAlign: "center"}}>Forgot Password</h5>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated}>
                            <FloatingLabel label="Email">
                                <Form.Control
                                    value={form.email}
                                    required
                                    type="email"
                                    placeholder=""
                                />
                            </FloatingLabel>

                            <div>
                                <Button variant={"btn btn-outline-primary"} onClick={handleSubmit} className="mt-4">
                                    Send Reset Link
                                </Button>
                            </div>

                            <div>
                                <Button variant={"btn btn-outline-secondary"} onClick={redirectToLogin}
                                        className="mt-4 mb-4">
                                    Back to login
                                </Button>
                            </div>

                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}