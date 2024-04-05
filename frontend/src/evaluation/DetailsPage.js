import {Container} from 'react-bootstrap';
import EvaluationDetails from "./EvaluationDetails";

const DetailsPage = () => {
    return (
        <Container className="mt-5">
            <h3>Record Detail</h3>
            <EvaluationDetails/>
        </Container>
    );
};

export default DetailsPage;
