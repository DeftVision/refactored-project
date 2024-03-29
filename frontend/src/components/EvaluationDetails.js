import {Col, Container, Row, Table} from 'react-bootstrap';
import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {format} from 'date-fns';


export default function EvaluationDetails() {
    const {id} = useParams();
    const [evaluations, setEvaluations] = useState('');


    async function getEvaluations() {
        try {
            const response = await fetch(`http://localhost:8000/api/eval/evaluation/${id}`, {
                method: "GET",
            });
            const _response = await response.json();
            if (response.ok && _response.evaluation) {
                setEvaluations(_response.evaluation._id);
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

    return (
        <Container style={{display: "flex"}}>
            <Col>
                <Table hover responsive
                       style={{
                           flexWrap: "wrap",
                           alignContent: "middle",
                           justifyContent: "center"
                       }}>
                    <thead>
                    <tr>
                        <th>Field</th>
                        <th>Response</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>

                    </tr>
                    </tbody>
                </Table>
            </Col>

        </Container>
    );
};
