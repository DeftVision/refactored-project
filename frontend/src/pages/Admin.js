import { useState } from 'react';
import { Container, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import UserData from '../components/UserData';
import EvaluationData from '../components/EvaluationData';
import AnnouncementData from '../components/AnnouncementData';
import DocumentData from '../components/DocumentData';
import AdminDefault from '../components/AdminDefault';
const Admin = () => {
    const [componentShow, setComponentShow] = useState('default');

    return (
        <Container className="" style={{display: "flex", flexDirection: "row"}}>

            <Col className="col-2">
                <ListGroup variant={"flush"}>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("user")} variant={"btn"}>Users</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("evaluation")} variant={"btn"}>Evaluations</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("announcement")} variant={"btn"}>Announcements</ListGroup.Item>
                <ListGroup.Item as={Link} onClick={() => setComponentShow("document")} variant={"btn"}>Documents</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col>
                {componentShow === 'default' && <AdminDefault  />}
                {componentShow === 'user' && <UserData  />}
                {componentShow === 'evaluation' && <EvaluationData/>}
                {componentShow === 'announcement' && <AnnouncementData/>}
                {componentShow === 'document' && <DocumentData/>}
            </Col>

        </Container>
    );
};

export default Admin;