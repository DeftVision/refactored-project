import { useState } from 'react';
import {Container, Button, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import UserData from '../components/UserData';
import EvaluationData from '../components/EvaluationData';
import AnnouncementData from '../components/AnnouncementData';
import DocumentData from '../components/DocumentData';
const Admin = () => {
    const [componentShow, setComponentShow] = useState('default');

    return (
        <Container style={{display: "flex", flexDirection: "row"}}>
            <ListGroup variant={"flush"}>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("user")} variant={"btn"}>Users</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("evaluation")} variant={"btn"}>Evaluations</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("announcement")} variant={"btn"}>Announcements</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("document")} variant={"btn"}>Documents</ListGroup.Item>
            </ListGroup>
                <Col>
                    {componentShow === 'default' && <img src="/linechart%20clipart.png" alt="Line Chart"  />}
                    {componentShow === 'user' && <UserData  />}
                    {componentShow === 'evaluation' && <EvaluationData/>}
                    {componentShow === 'announcement' && <AnnouncementData/>}
                    {componentShow === 'document' && <DocumentData/>}
                </Col>

        </Container>
    );
};

export default Admin;