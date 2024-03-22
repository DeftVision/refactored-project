import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

import * as yup from 'yup';
import * as formik from "formik";

export default function validation() {
    const { Formik } = formik;


    return (
        <>
            <h3>Validation Test Page</h3>

            {({ handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group md="4" controlId="validationFormik01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"

                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            )}
        </>
    );
}

