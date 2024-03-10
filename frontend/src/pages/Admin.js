import { Card, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserData from '../components/UserData';
import EvaluationData from '../components/EvaluationData';
import AnnouncementData from '../components/AnnouncementData';
const Admin = () => {
    return (
        <Container style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <h3 className="page-title mb-4">Admin</h3>
            <Card body as={Link} to="/users" className="admin-card shadow">Users</Card>
            <Card body as={Link} to="/evaluations" className="admin-card shadow">Evaluations</Card>
            <Card body as={Link} to="/announcements" className="admin-card shadow">Announcements</Card>
            <Card body as={Link} to="/documents" className="admin-card shadow">Documents</Card>

            <div>
                <UserData/>
            </div>

            <div>
                <EvaluationData/>
            </div>

            <div>
                <AnnouncementData/>
            </div>
        </Container>
    );
};

export default Admin;