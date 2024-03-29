import {Container, Table, Col, Row, Button} from 'react-bootstrap';
import {useState, useEffect} from "react";
import {EvaluationDetails} from "../components";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import EvaluationDefault from "../components/EvaluationDefault";


const Evaluations = () => {
    const [evaluations, setEvaluations] = useState([])
    const [evaluationShow, setEvaluationShow] = useState('default')

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


    /*function getScoreColors(grade) {
        if (grade >= 4.5 && grade <= 5) {
            return "rgba(54, 158, 84, .7)";
        } else if (grade >= 2.5 && grade < 4.5) {
            return "rgba(237, 123, 9, .25)";
        } else if (grade < 2.5 && grade >= 0) {
            return "rgba(181, 9, 9, .3)";
        } else {
            return "score out of range";
        }

    }*/

    return (
        <Container className="mt-5" style={{maxWidth: "100vw"}}>

            <Row>
                <h3 className="page-title mb-5">Evaluations</h3>

            </Row>

            <Row>
                <Col className="col-2">
                    <Table>
                        <tbody>
                        {evaluations.map((evaluation) =>
                            <tr key={evaluation._id}>
                                <td>

                                    {/*{format(new Date(evaluation.visitDateTime), "M dd yy")}*/}

                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>

                <Col style={{textAlign: "center"}} className="col-8">
                    {evaluationShow == 'default' && <EvaluationDefault/>}
                </Col>
            </Row>

        </Container>
    )
}

export default Evaluations;
