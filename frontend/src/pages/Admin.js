import {Container, Button} from 'react-bootstrap';
import Loading from '../pages/Loading';
import UserForm from '../components/UserForm';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <Container>
            <div>Admin</div>
            <Button as={Link} to="/userform" variant={"btn btn-outline-secondary"}>New User</Button>
        </Container>
    );
};

export default Admin;