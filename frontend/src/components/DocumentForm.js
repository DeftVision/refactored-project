import {useState, useEffect} from 'react';
import {Container, Form, Button, FloatingLabel} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import Loading from '../pages/Loading';


const form_default = {
    docName: "",
    category: "",
    docUpload: ""
}


export default function DocumentForm({newDocument}) {
    const [form, setForm] = useState(form_default);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false)
    const {id} = useParams();


    useEffect(() => {
        async function editDocument() {
            const response = await fetch(`http://localhost:8000/api/docs/document/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();
            setValidated(true)

            if (!response.ok) {
                console.log(_response.error);
                alert(_response);
            }
            if (response.ok) {
                const {docName, category, docUpload} = _response.document;
                setForm({docName, category, docUpload});
            }
        }

        if (newDocument) {
            setLoading(true);
        }
        if (!newDocument) {
            editDocument();
        }
        setLoading(false);
    }, []);

    if (loading) {
        <Loading/>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = "http://localhost:8000/api/docs/newDocument";
        let method = "POST";

        if (!newDocument) {
            url = `http://localhost:8000/api/docs/update/${id}`;
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
        setValidated(true)
        if (response.ok) {
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

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <FloatingLabel label="Document Name" className="mb-4">
                    <Form.Control
                        type="text"
                        controlid="name"
                        autocomplete="docname"
                        value={form.docName}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                docName: e.target.value,
                            });
                        }}
                        required
                    />
                </FloatingLabel>
                <FloatingLabel label="Category" className="mb-4">
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
                        required
                    />
                </FloatingLabel>

                <Form.Group controlid="image" className="mb-4">
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                setDocUpload: (e.target.files[0]),
                            })
                        }}
                        required
                    />
                </Form.Group>

                <Button variant={"btn btn-outline-success"} type='submit' onClick={handleSubmit}>
                    {newDocument ? "+ new" : "update"}
                </Button>
                <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}}
                        type="submit">Cancel</Button>
            </Form>

        </Container>
    );
}