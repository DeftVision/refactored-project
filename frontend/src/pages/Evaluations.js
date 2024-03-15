import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";
import * as IoIcons from 'react-icons/io';



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
        if(response.ok && _response.evaluations) {
            setEvaluations(_response.evaluations);
        } else {
            console.log(_response.error);
        }
    }

    useEffect(() => {
       getEvaluations();
    },[])

    const scoreColors = {
        "Great": "G"
    }

    return (
        <Container>
            <h3 className="page-title">Evaluations</h3>


        </Container>
    );
};

export default Evaluations;