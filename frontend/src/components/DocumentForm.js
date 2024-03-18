import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import Loading from '../pages/Loading';



const form_default = {
    audience: "",
    subject: "",
    title: "",
    content: "",
    display: false,
    priority: "",
}


export default function DocumentForm({newDocument}) {
    const [form, setForm] = useState(form_default);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        async function editDocument() {
            const response = await fetch(`http://localhost:8000/api/docs/document/${id}`, {
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
                const {docName, category, docUpload} = _response.document;
                setForm({docName, category, docUpload});
            }

        }
        if(newDocument) {
            setLoading(true);
        }
        if(!newDocument) {
            editDocument();
        }
        setLoading(false);
    }, []);

    if(loading) {
        <Loading />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = "http://localhost:8000/api/docs/newDocument";
        let method = "POST";

        if(!newDocument) {
            url = `http://localhost:8000/api/docs/update/${id}`;
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

    const navigate = useNavigate();
    const redirectToAdmin = () => {
        navigate(`/admin`);
    }

    return (
        <Container style={{width: "60%"}}>

            <div className="mb-5"><h3 className="page-title">{newDocument ? "New Document" : "Edit Document"}</h3></div>

            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Document Name</Form.Label>
                    <Form.Control
                        type="text"
                        controlid="doc-name"
                        autocomplete="docname"
                        value={form.docName}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                docName: e.target.value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        controlid="category"
                        autocomplete="category"
                        value={form.category}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                category: e.target.value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group controlid="image" className="mb-4">
                    <Form.Label>Document Upload</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                docUpload: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                <Button variant={"btn btn-outline-success"} type='submit'>
                    {newDocument ? "+ new" : "update"}
                </Button>
                <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}} type="submit">Cancel</Button>
            </form>

        </Container>
    );
}