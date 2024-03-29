import {Button, Container, Form, FloatingLabel} from 'react-bootstrap';
import {useContext, useEffect, useState} from 'react';
import Loading from '../pages/Loading';
import {useNavigate, useParams} from "react-router-dom";
import UserContext from "./UserContext";


const form_default = {
    evaluator: "",
    visitDateTime: "",
    location: "",
    cashier: "",
    greeting: false,
    repeatOrder: false,
    upsell: false,
    patio: false,
    wait: "",
    foodScore: "",
    appearanceScore: "",
    serviceScore: "",
    image: "",
    identifyManager: false,
    comments: ""
}

export default function EvaluationForm({newEvaluation}) {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(form_default);
    const {user} = useContext(UserContext);
    const [foodSlider, setFoodSlider] = useState(0);
    const [serviceSlider, setServiceSlider] = useState(0);
    const [appearanceSlider, setAppearanceSlider] = useState(0);
    const [validated, setValidated] = useState(false);


    const {id} = useParams();
    const navigate = useNavigate();
    const redirectToAdmin = () => {
        navigate(`/admin`)
    }

    useEffect(() => {
        async function editEvaluation() {
            const response = await fetch(`http://localhost:8000/api/eval/evaluation/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();
            if (!response.ok) {
                console.log(_response.message)
            }
            if (response.ok) {
                const {
                    visitDateTime,
                    location,
                    cashier,
                    greeting,
                    repeatOrder,
                    upsell,
                    patio,
                    wait,
                    foodScore,
                    appearanceScore,
                    serviceScore,
                    image,
                    identifyManager,
                    comments,
                    evaluator
                } = _response.evaluation;
                const visitDate = new Date(visitDateTime);
                const formattedVisitDateTime = visitDate.toISOString().substring(0, 16);
                setForm({
                    visitDateTime: formattedVisitDateTime,
                    location,
                    cashier,
                    greeting,
                    repeatOrder,
                    upsell,
                    patio,
                    wait,
                    foodScore,
                    appearanceScore,
                    serviceScore,
                    image,
                    identifyManager,
                    comments,
                    evaluator
                })
                console.log(_response.message);

            }
        }

        if (!newEvaluation) {
            editEvaluation();

        } else {
            setForm({
                ...form,
                evaluator: user.firstName + " " + user.lastName,
                foodScore: 0,
                serviceScore: 0,
                appearanceScore: 0
            })
        }
        setLoading(false);
    }, []);

    if (loading) {
        <Loading/>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = "http://localhost:8000/api/eval/newEvaluation";
        let method = "POST";

        if (!newEvaluation) {
            url = `http://localhost:8000/api/eval/update/${id}`;
            method = "PATCH";
        }
        setValidated(true);
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const _response = await response.json();

        if (response.ok) {
            console.log(_response.message);


        } else {
            console.log(_response.error);

        }
    }

    return (
        <>
            <Container style={{width: "60%"}}>
                <div className="mb-5">
                    <h3 className="page-title">{newEvaluation ? "New Evaluation" : "Edit Evaluation"}</h3>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FloatingLabel label="Evaluator" controlid="evaluator" className="mb-4">
                        <Form.Control
                            type="text"
                            value={form.evaluator}
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Visit Date | Time" controlid="visitDateTime" className="mb-4">
                        <Form.Control
                            type="datetime-local"
                            autoComplete="visit-date-time"
                            value={form.visitDateTime}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    visitDateTime: e.target.value
                                });
                            }}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Location" controlid="location" className="mb-4">
                        <Form.Select
                            value={form.location}
                            autoComplete="location-name"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    location: e.target.value,
                                })
                            }}
                            required
                        >
                            <option></option>
                            <option value="Bountiful">Bountiful</option>
                            <option value="Draper">Draper</option>
                            <option value="East Mesa">East Mesa</option>
                            <option value="Jordan Landing">Jordan Landing</option>
                            <option value="Layton">Layton</option>
                            <option value="Lehi">Lehi</option>
                            <option value="Logan">Logan</option>
                            <option value="Mesa">Mesa</option>
                            <option value="Murray">Murray</option>
                            <option value="Orem">Orem</option>
                            <option value="Riverdale">Riverdale</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Spanish Fork">Spanish Fork</option>
                            <option value="St. George">St. George</option>
                        </Form.Select>

                    </FloatingLabel>
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
                    <FloatingLabel label="Cashier | Description" controlid="cashier-name" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder=''
                            autoComplete="cashier-name"
                            value={form.cashier}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    cashier: e.target.value,
                                })
                            }}
                            required
                        />
                    </FloatingLabel>
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
                            }}/>
                    </Form.Group>
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
                            }}/>
                    </Form.Group>
                    <FloatingLabel label="Wait Time" controlid="wait" className="mb-4">
                        <Form.Control
                            type="number"
                            placeholder=''
                            value={form.wait}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    wait: e.target.value,
                                })
                            }}
                            required
                        />
                    </FloatingLabel>
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
                            }}/>
                    </Form.Group>
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
                            }}/>
                    </Form.Group>
                    <Form.Group controlid="foodScore" className="mb-4">
                        <Form.Label>Food [1 low-10 high]: {foodSlider}</Form.Label>
                        <Form.Range
                            type="number"
                            min={0}
                            max={10}
                            value={form.foodScore}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    foodScore: (e.target.value)
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlid="appearanceScore" className="mb-4">
                        <Form.Label>Appearance [1 low-10 high]: {appearanceSlider}</Form.Label>
                        <Form.Range
                            type="number"
                            min={0}
                            max={10}
                            value={form.appearanceScore}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    appearanceScore: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlid="serviceScore" className="mb-4">
                        <Form.Label>Service [1 low-10 high]: {serviceSlider}</Form.Label>
                        <Form.Range
                            type="number"
                            min={0}
                            max={10}
                            value={form.serviceScore}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    serviceScore: (e.target.value)
                                })
                            }}
                        />
                    </Form.Group>
                    <FloatingLabel label="Comments" controlid="comments" className="mb-4">
                        <Form.Control
                            placeholder=''
                            as="textarea"
                            style={{height: "100px"}}
                            value={form.comments}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    comments: e.target.value,
                                })
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
                                    image: e.target.value,
                                })
                            }}
                            required
                        />
                    </Form.Group>
                    <Button variant={"btn btn-outline-success"} type='submit' onClick={handleSubmit}>
                        {newEvaluation ? "+ new" : "update"}
                    </Button>

                    <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}}
                            type="submit">Cancel
                    </Button>

                </Form>
            </Container>
        </>
    );
}