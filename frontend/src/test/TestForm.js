import {Button, Form, FloatingLabel, Container} from 'react-bootstrap';
import {useState} from "react";


const form_default = {
    firstName: "",
    selectField: "",
    slider: "0",
    funFact: "",
    document: null,
}

const TestForm = () => {
    const [form, setForm] = useState({slider: 0});
    const [validated, setValidated] = useState(false);
    const [newDocument, setNewDocument] = useState(false
    )
    const [currentFile, setCurrentFile] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/api/valid/validation`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });
        setValidated(true);
        const _response = await response.json();
        if (response.ok && _response) {
            console.log(_response)
        } else {
            return (_response.error);
        }
    }

    return (
        <Container style={{width: "60%"}}>
            <h3 className="mt-4 mb-4">Test Page</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FloatingLabel className="mb-4" label="name" controlid="firstName">
                    <Form.Control
                        required
                        type="text"
                        autoComplete="firstName"
                        value={form.firstName}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                firstName: e.target.value,
                            })
                        }}
                    />
                </FloatingLabel>


                <FloatingLabel className="4" controlid="selectField" label="select field">
                    <Form.Select
                        type="text"
                        autoComplete="selectField"
                        aria-placeholder=""
                        value={form.selectField}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                selectField: e.target.value
                            })
                        }}
                    >
                        <option></option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </Form.Select>

                </FloatingLabel>


                <Form.Group className="mt-4" controlid="slider">
                    <Form.Label>Score: {form.slider}</Form.Label>
                    <Form.Range
                        required
                        min={0}
                        max={10}
                        type="number"
                        value={form.slider}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                slider: e.target.value
                            })
                        }}
                    />
                </Form.Group>


                <FloatingLabel className="mt-4" label="fun fact" controlid="funfact">
                    <Form.Control
                        type="text"
                        autoComplete="fun-fact"
                        value={form.funFact}
                        placeholder=''
                        onChange={(e) => {
                            setForm({
                                ...form,
                                funFact: e.target.value,
                            })
                        }}

                    />
                </FloatingLabel>


                <Form.Control
                    className="mt-4"
                    type="file"
                    autoComplete="file-upload"
                    value={form.document}
                    placeholder=''
                    onChange={(e) => {
                        setForm({
                            ...form,
                            document: e.target.value,
                        })
                    }}
                    required
                />
                <hr/>

                <Form.Group className="mt-4"
                            style={{border: "1px solid black", margin: "24px 0px 0px", padding: "6px 12px"}}>
                    <Button variant={"btn"}>Choose File</Button>
                    <input type="text" style={{border: "none", height: "100%"}}/>
                </Form.Group>
                <hr/>


                <Button>{newDocument ? "choose file" : "update file"}</Button>


                <hr/>

                <Button onClick={handleSubmit}
                        type="submit"
                        className="mt-5"
                        variant={"btn btn-outline-primary"}>
                    Submit form
                </Button>
            </Form>
        </Container>
    )
}

export default TestForm;
