import {Button, Form, Row} from 'react-bootstrap';
import {useState} from "react";


const form_default = {
    username: "",
    startDate: "",
    slider: 0,
    funFact: "",
}

export default function Validation() {

    const [form, setForm] = useState(form_default);
    const [validated, setValidated] = useState(false);
    /*const {Formik} = formik;*/

    const handleSubmit = async (e) => {
        e.preventDefault();

const form = e.currentTarget;
        if(form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        const response = await fetch(`http://localhost:8000/api/valid/validation`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const _response = await response.json();
        if (response.ok) {
            console.log("loaded fine")
        } else {
            return (_response.error);
        }
    }

    return (
        <>
            <h3>Validation Test Page</h3>
            <h5 style={{color: "red"}}></h5>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="username">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group md="4" controlId="startdate">
                        <Form.Label>start date</Form.Label>
                        <Form.Control
                            type="text"
                            name="startdate"
                            required
                            />
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
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group md="4" controlId="funfact">
                        <Form.Label>fun fact</Form.Label>
                        <Form.Control
                            type="text"
                            name="funfact"
                            required
                            />
                    </Form.Group>
                </Row>
                <Button onClick={handleSubmit} type="submit" className="mt-5" variant={"btn btn-outline-primary"}>Submit form</Button>

            </Form>

        </>
    )

}