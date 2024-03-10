import {Container, Button} from 'react-bootstrap';
import Loading from '../pages/Loading';
import UserForm from '../components/UserForm';
import EvaluationForm from '../components/EvaluationForm';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <Container style={{display: "flex", flexDirection: "column"}}>
            <div>Admin</div>
            <Button as={Link} to="/userform" variant={"btn btn-outline-secondary"}>New User</Button>
            <Button as={Link} to="/evaluationform" variant={"btn btn-outline-secondary"}>New Evaluation</Button>
        </Container>
    );
};

export default Admin;