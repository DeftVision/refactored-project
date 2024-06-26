import {useState} from 'react';
import {Container, Col, Row, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import UserData from '../auth/UserData';
import EvaluationData from '../evaluation/EvaluationData';
import AnnouncementData from '../announcement/AnnouncementData';
import DocumentData from '../document/DocumentData';
import AdminDefault from "../admin/AdminDefault";


const Admin = () => {
    const [componentShow, setComponentShow] = useState('default');

    return (
        <Container>
            <Row>
                <Col xs={12} md={2}>
                    <ListGroup variant={"flush"}>
                        <ListGroup.Item as={Link} onClick={() => setComponentShow("user")}
                                        variant={"btn"}>Users</ListGroup.Item>
                        <ListGroup.Item as={Link} onClick={() => setComponentShow("evaluation")}
                                        variant={"btn"}>Evaluations</ListGroup.Item>
                        <ListGroup.Item as={Link} onClick={() => setComponentShow("announcement")}
                                        variant={"btn"}>Announcements</ListGroup.Item>
                        <ListGroup.Item as={Link} onClick={() => setComponentShow("document")}
                                        variant={"btn"}>Documents</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={12} md={8} className="mt-5">
                    {componentShow === 'default' && <AdminDefault/>}
                    {componentShow === 'user' && <UserData/>}
                    {componentShow === 'evaluation' && <EvaluationData/>}
                    {componentShow === 'announcement' && <AnnouncementData/>}
                    {componentShow === 'document' && <DocumentData/>}
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;