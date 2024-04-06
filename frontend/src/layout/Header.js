import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useContext} from "react";
import UserContext from '../components/UserContext';
import cookies from 'js-cookie';


export default function Header() {
    const {user, setUser} = useContext(UserContext);

    function logout() {
        setUser(null);
        cookies.remove("userCookie");
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant={"dark"} className="mb-5 shadow">
                <Container>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/announcements">Announcements</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/evaluations">Evaluations</Nav.Link>
                            <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
                            <Nav.Link as={Link} to="/test">Testing</Nav.Link>
                            {user && user.role === 'Admin' && (
                                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>)}

                            {user &&
                                <Nav.Link onClick={logout}>Logout</Nav.Link>}

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    );
};
