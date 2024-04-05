import {Card, Container, Form, InputGroup} from 'react-bootstrap';
import {useContext} from 'react';
import UserContext from '../components/UserContext';
import * as FavIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';


export default function Profile() {
    const {user} = useContext(UserContext);


    return (
        <Container style={{width: "60%"}}>
            <Card className="shadow">
                <Card.Body style={{padding: "20px"}}>
                    <Form>
                        <InputGroup className="mb-4">
                            <InputGroup.Text className="profile-icon-field"><FavIcons.FaEnvelope
                                className="email-icon"/>
                                <span className="profile-icon-label">Email</span>
                            </InputGroup.Text>
                            <Form.Control className="responsive-input" type="text" readOnly value={user.email}/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroup.Text className="profile-icon-field">
                                <FavIcons.FaMapPin className="location-icon"/>
                                <span className="profile-icon-label">Location</span>
                            </InputGroup.Text>
                            <Form.Control type="text" readOnly value={user.location}/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroup.Text className="profile-icon-field"> <FavIcons.FaKey
                                className="access-icon icon-icon-size"/>
                                <span className="profile-icon-label icon-label-size">Access</span>
                            </InputGroup.Text>
                            <Form.Control className="text-value-size" type="text" readOnly value={user.role}/>
                        </InputGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

