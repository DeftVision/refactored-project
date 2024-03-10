import { useState, useEffect } from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserData from '../components/UserData';
import EvaluationData from '../components/EvaluationData';
import AnnouncementData from '../components/AnnouncementData';
import DocumentData from '../components/DocumentData';
const Admin = () => {
    const [userShow, setUserShow] = useState(false)
    const [evaluationShow, setEvaluationShow] = useState(false)
    const [announcementShow, setAnnouncementShow] = useState(false)
    const [documentShow, setDocumentShow] = useState(false)





    return (
        <Container style={{display: "flex", flexFlow: "column"}}>
            <Row>
                <Col>
                    <Card body as={Link}  className="admin-card shadow">Users</Card>
                    <Card body as={Link} className="admin-card shadow">Evaluations</Card>
                    <Card body as={Link} className="admin-card shadow">Announcements</Card>
                    <Card body as={Link} className="admin-card shadow">Documents</Card>
                </Col>
                <Col>
                    <UserData id="user-data" />
                    <EvaluationData id="evaluation-data"/>
                    <AnnouncementData id="announcement-data"/>
                    <DocumentData id="document-data"/>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;