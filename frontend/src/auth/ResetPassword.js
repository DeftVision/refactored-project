import {Card, Container, Form, Button, FloatingLabel} from 'react-bootstrap';
import {useState, useContext} from "react";
import UserContext from '../components/UserContext';
import {useNavigate} from 'react-router-dom';

const form_default = {
    email: "",
    confirmEmail: "",
}

export default function ResetPassword() {
    const [form, setForm] = useState(form_default);
    const [validated, setValidated] = useState(false);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate("/");
    }


    function handleSubmit() {
        setValidated(true)
    }

    return (
        <Container style={{width: "60%"}}>
            <Card className="shadow mt-5 mb-5">
                <Card.Header>
                    <h5 style={{textAlign: "center"}}>Change Password</h5>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated}>
                        <FloatingLabel label="Current Password" className="mb-4">
                            <Form.Control
                                value={form.password}
                                required
                                type="password"
                                placeholder=''
                                onChange={(e) => {
                                    setForm({
                                        password: e.target.value
                                    })
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="New Password" className="mb-4">
                            <Form.Control
                                value={form.password}
                                required
                                type="password"
                                placeholder=''
                                onChange={(e) => {
                                    setForm({
                                        password: e.target.value
                                    })
                                }}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Confirm New Password">
                            <Form.Control
                                value={form.password}
                                required
                                type="password"
                                placeholder=''
                                onChange={(e) => {
                                    setForm({
                                        password: e.target.value
                                    })
                                }}
                            />
                        </FloatingLabel>
                        <div>
                            <Button variant={"btn"} onClick={handleSubmit} className="mt-4">

                                update
                            </Button>
                        </div>
                        <div>
                            <Button onClick={redirectToHome} variant={"btn"} className="mt-4">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}