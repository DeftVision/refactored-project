import {Container, Card } from 'react-bootstrap';
import {useState, useEffect} from "react";
import {format} from 'date-fns';


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
            {evaluations.map((evaluation) =>
            <Card key={evaluation._id} className="shadow mt-5" style={{maxWidth: "250px", backgroundColor: getScoreColors(evaluation.score)}}>
                <Card.Body>

                    <Card.Subtitle>
                        {format(new Date(evaluation.visitDateTime), 'EEE, dd MMMM yyyy')}
                    </Card.Subtitle>

                    <Card.Subtitle style={{marginTop: "10px"}}>Score:
                        <span>{" "}{evaluation.score}</span>
                    </Card.Subtitle>
                </Card.Body>
            </Card>)}

        </Container>
    )}

export default Evaluations;


/*
          */