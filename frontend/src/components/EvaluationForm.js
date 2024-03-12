import { Container, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import UserContext from '../components/UserContext';
import { useContext } from 'react';
import { useParams } from "react-router-dom";

const form_default = {
    visitDateTime: "",
    evaluator: "",
    location: "",
    cashier: "",
    greeting: false,
    repeatOrder: false,
    upsell: false,
    patio: false,
    wait: "",
    foodScore: "",
    cleanScore: "",
    serviceScore: "",
    score: "",
    image: "",
    identifyManager: false,
    comments: "",
}


export default function EvaluationForm() {
    const { user, setUser } = useContext(UserContext);
    const [form, setForm] = useState(form_default);
    const {id} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/eval/newEvaluation", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type" : "application/json",
            }
        })

        const _response = await response.json();
        if(!response.ok) {
            console.log(_response.error)
        }
        if(response.ok) {
            console.log(_response);
        }
    }

    return (
        <Container fluid style={{width: "60%", display: "flex", flexDirection: "column"}} className="user-form">
            <h3 className="mb-4 page-title">New Evaluation</h3>


            {/*Visit Date and Time*/}
            <form onSubmit={handleSubmit}>

                <Form.Group controlid="evaluatorName" className="mb-4">
                    <Form.Label>Evaluator</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={form.user}
                        autoComplete="evaluator-name"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                evaluator: e.target.value
                            })
                        }}
                    />
                </Form.Group>

                <Form.Group controlid="visitDateTime" className="mb-4">
                    <Form.Label>Visit Date | Time</Form.Label>
                    <Form.Control
                        type="Date"
                        autoComplete="visit-date-time"
                        value={form.visitDateTime}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                visitDateTime: e.target.value,
                            });
                        }}
                    />
                </Form.Group>

                {/* Location */}
                <Form.Group controlid="location" className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                        value={form.location}
                        autoComplete="location-name"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                location: e.target.value,
                            })
                        }}>
                        <option></option>
                        <option value="Bountiful">Bountiful</option>
                        <option value="Draper">Draper</option>
                        <option value="East Mesa">East Mesa</option>
                        <option value="Jordan Landing">Jordan Landing</option>
                        <option value="Layton">Layton</option>
                        <option value="Lehi">Lehi</option>
                        <option value="Logan">Logan</option>
                        <option value="Mesa">Mesa</option>
                        <option value="Murray">Murray 2</option>
                        <option value="Orem">Orem</option>
                        <option value="Riverdale">Riverdale</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Spanish Fork">Spanish Fork</option>
                        <option value="St. George">St. George</option>
                    </Form.Select>
                </Form.Group>

                {/* Greeting */}
                <Form.Group controlid="greeted" className="mb-4">
                    <Form.Check
                        type="switch"
                        id="greeting"
                        label="Greeted"
                        checked={form.greeting}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                greeting: e.target.checked
                            })
                        }}/>
                </Form.Group>

                {/* Cashier Name or Description */}
                <Form.Group controlid="cashier" className="mb-4">
                    <Form.Label>Cashier / Description</Form.Label>
                    <Form.Control
                        type="text"
                        autoComplete="cashier-name"
                        value={form.cashier}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                cashier: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                {/* Upsell sweet potato fries */}
                <Form.Group controlid="upsell" className="mb-4">
                    <Form.Check
                        type="switch"
                        id="upsell"
                        label="Upsold Sweet Potato Fries"
                        checkced={form.upsell}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                upsell: e.target.checked,
                            })
                        }} />
                </Form.Group>

                {/* Order was Repeated */}
                <Form.Group controlid="repeatOrder" className="mb-4">
                    <Form.Check
                        type="switch"
                        autoComplete="repeat-order"
                        id="repeatOrder"
                        label="order repeated"
                        checked={form.repeatOrder}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                repeatOrder: e.target.checked,
                            })
                        }} />
                </Form.Group>

                {/* Time waiting for food in minutes */}
                <Form.Group controlid="wait" className="mb-4">
                    <Form.Label>How long did you wait for your food?</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="minutes"
                        value={form.wait}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                wait: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                {/* Was the manager identifiable? */}
                <Form.Group controlid="identify-manager" className="mb-4">
                    <Form.Check
                        type="switch"
                        autoComplete="identify-manager"
                        id="identifyManager"
                        label="Can you identify who the manager is?"
                        checked={form.identifyManager}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                identifyManager: e.target.checked,
                            })
                        }} />
                </Form.Group>

                {/* Was the patio clean and organized? */}
                <Form.Group controlid="patio" className="mb-4">
                    <Form.Check
                        type="switch"
                        autoComplete="patio"
                        id="patio"
                        label="Is the patio clean and ogranized?"
                        checked={form.patio}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                patio: e.target.checked,
                            })
                        }} />
                </Form.Group>

                {/* Food Score 1-5 [5 is highest]  */}
                <Form.Group controlid="foodScore" className="mb-4">
                    <Form.Label>Food Score</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.foodScore}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                foodScore: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                {/* Clean Score 1-5 [5 is highest]  */}
                <Form.Group controlid="cleanScore" className="mb-4">
                    <Form.Label>Clean Score</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.cleanScore}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                cleanScore: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                {/* Service Score 1-5 [5 is highest]  */}
                <Form.Group controlid="serviceScore" className="mb-4">
                    <Form.Label>Service Score</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.serviceScore}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                serviceScore: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                {/* Calculate average score from the 3 scores */}
                <Form.Group controlid="score" className="mb-4">
                    <Form.Label>Final Score</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        value={form.score}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                score: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                <Form.Group controlid="comments" className="mb-4">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{height: "100px"}}
                        value={form.comments}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                comments: e.target.value,
                            })
                        }}
                    />
                </Form.Group>

                <Form.Group controlid="image" className="mb-4">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                image: e.target.value,
                            })
                        }}
                    />
                </Form.Group>
                <Button variant={"btn btn-outline-secondary"} type='submit'>
                    + Evaluation
                </Button>
            </form>
        </Container>

    )
}