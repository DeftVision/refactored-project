import {Button, Form, FloatingLabel, Container} from 'react-bootstrap';
import {useEffect, useState} from "react";


const form_default = {
    firstName: "",
    selectField: "",
    slider: 0,
    funFact: "",
}

export default function Validation() {
    const [form, setForm] = useState({form_default});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/api/valid/validation`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const _response = await response.json();
        if (response.ok && _response) {
            console.log(_response)
        } else {
            return (_response.error);
        }
    }

    return (
        <Container style={{width: "60%"}}>
            <h3 className="mt-4">Validation Test Page</h3>
            <h5 style={{color: "red"}}></h5>

            <form onSubmit={handleSubmit}>

                <FloatingLabel className="mb-4" label="first name" controlid="firstName">
                    <Form.Control
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
                        onChange={(e) => {
                            setForm({
                                ...form,
                                selectField: e.target.value
                            })
                        }}
                    >
                        <option>options</option>
                        <option value="option 1">option 1</option>
                        <option value="option 2">option 2</option>
                        <option value="option 3">option 3</option>
                        <option value="option 4">option 4</option>
                    </Form.Select>

                </FloatingLabel>


                <Form.Group className="mt-4" controlid="slider">
                    <Form.Label>Slider</Form.Label>
                    <Form.Range
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
                <Button onClick={handleSubmit}
                        type="submit"
                        className="mt-5"
                        variant={"btn btn-outline-primary"}>
                    Submit form
                </Button>

            </form>
        </Container>
    )
}
