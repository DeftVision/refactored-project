import { useState, useContext } from "react";
import { Container, Form, FloatingLabel, Button, Card } from "react-bootstrap";
import UserContext from "../components/UserContext";
import cookies from "js-cookie";

const form_default = {
    email: "",
    password: "",
};

export default function Login() {
    const [form, setForm] = useState(form_default);
    const [message, setMessage] = useState(null);
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const _response = await response.json();

        if(response.ok && _response.user) {
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
            <Card className="shadow">
                <Card.Body>
                    <Card.Title className="mb-4" style={{textAlign: "center"}}>LOGIN</Card.Title>
                    <Card.Text>
                        <p style={{color: "#ab0a0a", textAlign: "center"}}>{message}</p>
                        <form noValidate onSubmit={handleSubmit}>
                            <FloatingLabel controlid='email' label='Email' className='mb-4'>
                                <Form.Control
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
                            <Button variant={"btn btn-outline-secondary"} type='submit' className="mb-4">
                                login
                            </Button>
                        </form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}
