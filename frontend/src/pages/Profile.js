import {Container, Form, Button, InputGroup} from 'react-bootstrap';
import {useContext} from 'react';
import UserContext from '../components/UserContext';
import * as FavIcons from 'react-icons/fa';

export default function Profile() {
    const {user} = useContext(UserContext);


    return (
        <Container style={{width: "60%"}}>
            <Form>
                <InputGroup className="mb-4 shadow">
                    <InputGroup.Text><FavIcons.FaEnvelope
                        style={{color: "green"}}/></InputGroup.Text>
                    <Form.Control type="text" readOnly value={user.email}/>
                </InputGroup>
                <InputGroup className="mb-4 shadow">
                    <InputGroup.Text><FavIcons.FaMapPin style={{color: "red"}}/></InputGroup.Text>
                    <Form.Control type="text" readOnly value={user.location}/>
                </InputGroup>
                <InputGroup className="mb-4 shadow">
                    <InputGroup.Text><FavIcons.FaScroll style={{color: "orange"}}/></InputGroup.Text>
                    <Form.Control type="text" readOnly value={user.role}/>
                </InputGroup>
            </Form>
        </Container>
    );
}

