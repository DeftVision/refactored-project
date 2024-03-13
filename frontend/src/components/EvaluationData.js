import {useState, useEffect} from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

export default function EvaluationData () {
    const [evaluations, setEvaluations] = useState([]);

    async function getEvaluations() {
        try {
            const response = await fetch("http://localhost:8000/api/eval/evaluations", {
                method: "GET",
            });
            const _response = await response.json();
            if(response.ok && _response.evaluations) {
                setEvaluations(_response.evaluations);
            } else {
                console.log(_response.error);
            }
        }
        catch (error) {
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

            if(response.ok) {
                setEvaluations(evaluations.filter(evaluation => evaluation._id !== evaluationId));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Table hover responsive="sm" className="align-middle">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Score</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {evaluations.map((evaluation) => <tr key={evaluation._id}>
                    <td>{evaluation.visitDateTime}</td>
                    <td>{evaluation.location}</td>
                    <td>{evaluation.score}</td>
                    <td>
                        <Button as={Link} to={`/editevaluation/${evaluation._id}`} variant={"btn"}>
                            <FaIcons.FaEdit style={{color: "dodgerblue"}} />
                        </Button>

                        <Button variant={"btn"} type="submit" onClick={() => deleteEvaluation(evaluation._id)}>
                            <FaIcons.FaTrash style={{color: "#cfcccc"}} />
                        </Button>
                    </td>
                </tr>)}
                </tbody>
            </Table>
        </Container>
    )

}

