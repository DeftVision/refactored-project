import { useState, useEffect } from 'react';
import { Container, Form, Button, FormText } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading';


const form_default = {
    audience: "",
    subject: "",
    title: "",
    content: "",
    display: false,
    priority: "",
}


export default function AnnouncementForm({newAnnouncement}) {
    const [form, setForm] = useState(form_default);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();



    useEffect(() => {
        async function editAnnouncement() {
            const response = await fetch(`http://localhost:8000/api/announce/announcement/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();

            if (!response.ok) {
                console.log(_response.error);
            }
            if (response.ok) {
                const {title, subject, content, audience, priority, display} = _response.announcement;
                setForm({title, subject, content, audience, priority, display});
            }

        }
        if(newAnnouncement) {
            setLoading(true);
        }
        if(!newAnnouncement) {
            editAnnouncement();
        }
        setLoading(false);
    }, []);

    const navigate = useNavigate();
    const redirectToAdmin = () => {
        navigate(`/admin`);
    }

    if(loading) {
        <Loading />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = "http://localhost:8000/api/announce/newAnnouncement";
        let method = "POST";

        if(!newAnnouncement) {
            url = `http://localhost:8000/api/announce/update/${id}`;
            method = "PATCH";
        }

        const response = await fetch( url, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const _response = await response.json();

        if(response.ok) {
            console.log(_response);
        } else {
            console.log(_response.error);
        }
    }

    return (
        <Container fluid style={{width: "60%", display: "flex", flexDirection: "column"}} className="user-form">

            <div className="mb-5">
                <h3 className="page-title">{newAnnouncement ? "New Announcement" : "Edit Announcement"}</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        controlid="title"
                        autocomplete="title"
                        value={form.title}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                title: e.target.value,
                            });
                        }}
                    />
                    <FormText>[ not displayed to users ]</FormText>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        controlid="subject"
                        autocomplete="subject"
                        value={form.subject}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                subject: e.target.value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        controlid="content"
                        autocomplete="content"
                        value={form.content}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                content: e.target.value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Audience</Form.Label>
                    <Form.Select
                        type="text"
                        controlid="audience"
                        autocomplete="audience"
                        value={form.audience}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                audience: e.target.value,
                            });
                        }}
                    >
                        <option></option>
                        <option value="Manager">Manager</option>
                        <option value="Shopper">Shopper</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Priority Level</Form.Label>
                    <Form.Select
                        type="text"
                        controlid="priority"
                        autocomplete="priority"
                        value={form.priority}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                priority: e.target.value,
                            });
                        }}
                    >
                        <option></option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlid="display-announcement" className="mb-4">
                    <Form.Check
                        type="switch"
                        label="Display"
                        id="displayAnnouncement"
                        checked={form.display}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                display: e.target.checked,
                            })
                        }}

                    />
                </Form.Group>
                <Button variant={"btn btn-outline-success"}  type="submit">
                    {newAnnouncement ? "+ new" : "update"}
                </Button>
                <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}} type="submit">Cancel</Button>
            </form>

        </Container>
    );
}