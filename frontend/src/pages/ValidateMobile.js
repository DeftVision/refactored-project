import {Button, Form, Row} from 'react-bootstrap';
import {useState} from "react";
/*import * as yup from 'yup';
import * as formik from "formik";*/

export default function ValidationMobile() {
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState(null);


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
        if (response.ok) {
            console.log(_response.message)
        } else {
            setMessage(_response.message);
        }
    }

    return (
        <>
            <h3>Validation Mobile View</h3>
            <h5 style={{color: "red"}}>{message}</h5>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="username">
                        <Form.Label>username</Form.Label>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control
                            type="text"
                            name="username"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    username: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group md="4" controlId="startdate">
                        <Form.Label>start date</Form.Label>
                        <Form.Control
                            type="text"
                            name="startdate"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    startDate: e.target.value,
                                });
                            }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group md="4" controlId="startdate">
                        <Form.Label>Slider</Form.Label>
                        <Form.Range
                            min={0}
                            max={10}
                            type="number"
                            name="startdate"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    slider: e.target.value,
                                });
                            }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group md="4" controlId="funfact">
                        <Form.Label>fun fact</Form.Label>
                        <Form.Control
                            type="text"
                            name="funfact"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    funFact: e.target.value,
                                });
                            }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="mt-5" variant={"btn btn-outline-primary"}>Submit form</Button>
                </Row>

            </Form>

        </>
    )

}