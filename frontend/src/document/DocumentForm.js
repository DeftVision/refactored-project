import {useState, useEffect} from 'react';
import {Container, Form, Button, FloatingLabel} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {app} from "../components/firebase";


const form_default = {
    docName: "",
    category: "",
    docUpload: ""
}


export default function DocumentForm({newDocument}) {
    const [form, setForm] = useState(form_default);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false)
    const {id} = useParams();


    /*
    *   edit document solution
    */

    useEffect(() => {
        async function editDocument() {
            const response = await fetch(`http://localhost:8000/api/docs/document/${id}`, {
                method: 'GET',
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

        if (newDocument) {
            setLoading(true);
        }
        if (!newDocument) {
            editDocument();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        /* if (!form.docUpload) {
             alert("Please select a file to upload.");
             return;
         }
 */
        const storage = getStorage(app);
        const storageRef = ref(storage, `${form.docName}`)

        const uploadTask = uploadBytesResumable(storageRef, form.docUpload);

        uploadTask.on(`state_changed`,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ` + progress + `% done`);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(`file available at`, downloadURL);
                    // Update form with downloadURL
                    const _form = {
                        ...form,
                        docUpload: downloadURL
                    };

                    let url = "http://localhost:8000/api/docs/newDocument";
                    let method = "POST";

                    if (!newDocument) {
                        url = `http://localhost:8000/api/docs/update/${id}`;
                        method = "PATCH";
                    }

                    const response = await fetch(url, {
                        method: method,
                        body: JSON.stringify(_form),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    const _response = await response.json();
                    setValidated(true)
                    if (response.ok) {
                        console.log(_response);
                    } else {
                        console.log(_response.error);
                    }
                })
            })

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
                    <Form.Select
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
                    >
                        <option></option>
                        <option value="Menu">Menu</option>
                        <option value="Safety">Safety</option>
                        <option value="Training">Training</option>
                        <option value="Process">Process</option>
                        <option value="Forms">Forms</option>

                    </Form.Select>
                </FloatingLabel>

                <Form.Group controlid="image" className="mb-4">
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                docUpload: e.target.files[0],
                            })
                        }}
                        required
                    />
                </Form.Group>

                <Button variant={"btn btn-outline-success"} type='submit' onClick={handleSubmit}>
                    {newDocument ? "+ new" : "update"}
                </Button>
                <Button as={Link} to="/admin" variant={"btn btn-outline-secondary"}
                        style={{marginLeft: "15px"}}>Cancel</Button>
            </Form>

        </Container>
    );
}