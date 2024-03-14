import {Container} from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from '../components/UserContext';

const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <Container>
            <h3 className="page-title">Welcome {user.firstName}</h3>

        </Container>
    );
};

export default Home;