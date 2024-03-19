import { useState, useEffect } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";

export default function UserData () {
    const [users, setUsers] = useState([]);


    async function getUsers() {
        try {
            const response = await fetch("http://localhost:8000/api/user/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const _response = await response.json();

            if (response.ok && _response.users) {
                setUsers(_response.users);
            } else {
                console.log(_response.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();

    }, []);

    async function deleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:8000/api/user/delete/${userId}`, {
                method: "DELETE"
            });
            if(response.ok) {
                setUsers(users.filter(user => user._id !== userId));
            }
        }
        catch (error) {
            console.log("Error deleting user:", error);
        }
    }
    return(
        <Container className="col-8">
            <Col>
            <Row>
                <Button as={Link} to="/userform" variant={"btn btn-outline-primary"} className="mb-4">Add New User</Button>
            </Row>
            <Table responsive="sm" hover className="align-middle">
                <thead>
                <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        {<Button as={Link} to={`/edituser/${user._id}`} variant={"btn"}>
                            <FaIcons.FaEdit style={{color: "dodgerblue"}} />
                        </Button>}

                        {<Button variant={"btn"} type="submit" onClick={() => deleteUser(user._id)}>
                            <FaIcons.FaTrash style={{color: "dimgray"}} />
                        </Button>}</td>
                </tr>)}
                </tbody>
            </Table>
            </Col>
        </Container>
    );
}