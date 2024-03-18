import { Container } from 'react-bootstrap';
import EvaluationDetails from "../components/EvaluationDetails";

export default function Loading () {
    return (
        <Container className="mt-5">
            <h3>Record Detail</h3>
            <EvaluationDetails />
        </Container>
    );
};

