import {useState, useEffect} from 'react';
import {Container, Form, FloatingLabel, Button} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import Loading from '../pages/Loading';


const form_default = {
    firstName: "",
    lastName: "",
    role: "",
    location: "",
    email: ""
}

export default function UserForm({newUser}) {
    const [form, setForm] = useState(form_default);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();
    const redirectToAdmin = () => {
        navigate(`/admin`)
    }
    useEffect(() => {

        async function editUser() {
            const response = await fetch(`http://localhost:8000/api/user/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();

            if (!response.ok) {
                console.log(_response.error)
            }
            if (response.ok) {
                const {firstName, lastName, role, email, location} = _response.user;

                setForm({firstName, lastName, role, email, location});
                console.log(_response.message)
            }
        }

        if (newUser) {
            setLoading(true);
        }
        if (!newUser) {
            editUser();
        }
        setLoading(false);
    }, [])

    if (loading) {
        return <Loading/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = "http://localhost:8000/api/user/register";
        let method = "POST";

        if (!newUser) {
            url = `http://localhost:8000/api/user/update/${id}`;
            method = "PATCH";
        }


        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const _response = await response.json();
        setValidated(true);
        if (!response.ok) {
            console.log(_response.error);
        }

        if (response.ok) {
            console.log(_response.message);
        }
    }

    return (
        <>
            <Container style={{width: "60%"}}>
                <h3 className="page-title mb-4">{newUser ? "New User" : "Edit User"}</h3>
                <Form noValaidate validated={validated} onSubmit={handleSubmit}>
                    <FloatingLabel controlId='firstName' label='First Name' className='form-label mb-4'>
                        <Form.Control
                            type='text'
                            value={form.firstName}
                            placeholder=''
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    firstName: e.target.value,
                                });
                            }}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId='lastName' label='Last Name' className='form-label mb-4'>
                        <Form.Control
                            type='text'
                            value={form.lastName}
                            placeholder=''
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    lastName: e.target.value,
                                });
                            }}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId='role' label='Role' className='form-label mb-4'>
                        <Form.Select
                            value={form.role}
                            placeholder=''
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    role: e.target.value,
                                });
                            }}
                            required
                        >
                            <option></option>
                            <option value="Shopper">Shopper</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel controlId='location' label='Select Location' className='form-label mb-4'>
                        <Form.Select
                            type='text'
                            value={form.location}

                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    location: e.target.value,
                                });
                            }}
                            required
                        >
                            <option></option>
                            <option value="Bountiful">Bountiful</option>
                            <option value="Draper">Draper</option>
                            <option value="East Mesa">East Mesa</option>
                            <option value="Idaho Falls">Idaho Falls</option>
                            <option value="Jordan Landing">Jordan Landing</option>
                            <option value="Layton">Layton</option>
                            <option value="Lehi">Lehi</option>
                            <option value="Logan">Logan</option>
                            <option value="Mesa">Mesa</option>
                            <option value="Murray">Murray</option>
                            <option value="Orem">Orem</option>
                            <option value="Riverdale">Riverdale</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Spanish Fork">Spanish Fork</option>
                            <option value="St. George">St. George</option>
                            <option value="Head Quarters">Head Quarters</option>
                            <option value="Shopper">Shopper</option>


                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel controlId='email' label='Email' className='form-label mb-4'>
                        <Form.Control
                            type='email'
                            value={form.email}
                            placeholder=''
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                });
                            }}
                            required
                        />
                    </FloatingLabel>


                    {newUser &&
                        <FloatingLabel controlId='password' label='Password' className='form-label mb-4'>
                            <Form.Control
                                type='password'
                                value={form.password}
                                placeholder=''
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    });
                                }}
                                required
                            />
                        </FloatingLabel>}

                    <Button variant={"btn btn-outline-success"} type='submit' onClick={handleSubmit}>
                        {newUser ? "+ new" : "update"}
                    </Button>
                    <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}}
                            type="submit">Cancel</Button>
                </Form>
            </Container>
        </>
    )
}