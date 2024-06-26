import {useState, useContext, useEffect} from 'react';
import {Table, Container, Button, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {format} from 'date-fns';
import UserContext from '../components/UserContext';

export default function EvaluationData() {
    const [evaluations, setEvaluations] = useState([]);
    const {user} = useContext(UserContext);


    async function getEvaluations() {
        try {
            const response = await fetch(`http://localhost:8000/api/eval/evaluations?location=${user.location}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const _response = await response.json();
            if (response.ok && _response.evaluations) {
                setEvaluations(_response.evaluations);
            } else {
                console.log(_response.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvaluations();
    }, []);

    async function deleteEvaluation(evaluationId) {
        try {
            const response = await fetch(`http://localhost:8000/api/eval/delete/${evaluationId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setEvaluations(evaluations.filter(evaluation => evaluation._id !== evaluationId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="col-8">
            <Col>
                <Row>
                    <Button as={Link} to="/evaluationform" variant={"btn btn-outline-primary"} className="mb-4">
                        Add Evaluation
                    </Button>
                </Row>
                <Row>
                    <Table hover responsive="sm" className="align-middle">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {evaluations.map((evaluation) => <tr key={evaluation._id}>
                            <td>{format(new Date(evaluation.visitDateTime), "EEE, MMMM dd yyyy h:mm")}</td>
                            <td>{evaluation.location}</td>
                            <td>
                                <Button as={Link} to={`/editevaluation/${evaluation._id}`} variant={"btn"}>
                                    <FaIcons.FaEdit style={{color: "dodgerblue"}}/>
                                </Button>

                                <Button variant={"btn"} type="submit"
                                        onClick={() => deleteEvaluation(evaluation._id)}>
                                    <FaIcons.FaTrash style={{color: "dimgray"}}/>
                                </Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </Container>)
}

