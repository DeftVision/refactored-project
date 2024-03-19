import {Container, Table, Button } from 'react-bootstrap';
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';


const Evaluations = () => {
    const [evaluations, setEvaluations] = useState([])

    async function getEvaluations() {
        const response = await fetch("http://localhost:8000/api/eval/evaluations", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const _response = await response.json();
        if (response.ok && _response.evaluations) {
            setEvaluations(_response.evaluations);
        } else {
            console.log(_response.error);
        }
    }

    useEffect(() => {
        getEvaluations();
    }, [])


    function getScoreColors(grade) {
        if (grade >= 4.5 && grade <= 5) {
            return "rgba(54, 158, 84, .7)";
        } else if (grade >= 2.5 && grade < 4.5) {
            return "rgba(237, 123, 9, .25)";
        } else if (grade < 2.5 && grade >= 0) {
            return "rgba(181, 9, 9, .3)";
        } else {
            return "score out of range";
        }

    }

    return (
        <Container className="mt-5" style={{maxWidth: "100vw"}}>
            <h3 className="page-title mb-5">Evaluations</h3>
            <Table hover responsive className="align-middle">
                <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Food</th>
                    <th>Service</th>
                    <th>Utility</th>
                </tr>
                </thead>
                <tbody>
                {evaluations.map((evaluation) =>
                    <tr key={evaluation._id}>
                        <td><Button as={Link} to="/details" variant={"btn"}></Button></td>
                        <td>{format(new Date(evaluation.visitDateTime), "MMM dd yy")}</td>
                        <td>{evaluation.location}</td>
                        <td>{evaluation.foodScore}</td>
                        <td>{evaluation.serviceScore}</td>
                        <td>{evaluation.cleanScore}</td>
                    </tr>
                )}
                </tbody>

            </Table>
        </Container>
    )}

export default Evaluations;
