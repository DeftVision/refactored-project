import { Container, Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Loading from '../pages/Loading';
import UserContext from '../components/UserContext'
import { useNavigate, useParams} from "react-router-dom";
const form_default = {
    visitDateTime: new Date(),
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
    image: "",
    identifyManager: false,
    comments: "",
}

export default function EvaluationForm({newEvaluation}) {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(form_default);
    const { user } = useContext(UserContext);


    const {id} = useParams();


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
                console.log(_response.error);

            }
            if (response.ok) {
                const {visitDateTime,location,cashier,greeting,repeatOrder,upsell,patio,wait,foodScore,cleanScore,serviceScore, image,identifyManager,comments} = _response.evaluation;
                const visitDate = new Date(visitDateTime);
                const formattedVisitDateTime = visitDate.toISOString().substring(0, 16);

                setForm({visitDateTime: formattedVisitDateTime,location,cashier,greeting,repeatOrder,upsell,patio,wait,foodScore,cleanScore,serviceScore, image,identifyManager,comments })
            }

        }
        if(newEvaluation) {
            setLoading(true);
        }
        if(!newEvaluation) {
            editEvaluation();
        }
        setLoading(false);
    }, []);

    if(loading) {
        <Loading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = "http://localhost:8000/api/eval/newEvaluation";
        let method = "POST";

        if(!newEvaluation) {
            url = `http://localhost:8000/api/eval/update/${id}`;
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
            <div className="mb-5"><h3 className="page-title">{newEvaluation ? "New Evaluation" : "Edit Evaluation"}</h3></div>
            <form onSubmit={handleSubmit}>

                <h6 style={{color: "#aaa"}} className="mb-4">{user.firstName + " " + user.lastName}</h6>

                <Form.Group controlid="visitDateTime" className="mb-4">
                    <Form.Label>Visit Date | Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        autoComplete="visit-date-time"
                        value = {form.visitDateTime}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                visitDateTime: (e.target.value),
                            });
                        }}
                    />
                </Form.Group>

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

                <Form.Group controlid="cleanScore" className="mb-4">
                    <Form.Label>Utility Score</Form.Label>
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
                <Button variant={"btn btn-outline-success"} type='submit'>
                    {newEvaluation ? "+ new" : "update"}
                </Button>
                <Button onClick={redirectToAdmin} variant={"btn btn-outline-secondary"} style={{marginLeft: "15px"}} type="submit">Cancel</Button>
            </form>
        </Container>

    )
}