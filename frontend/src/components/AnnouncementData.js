import {useEffect, useContext, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import UserContext from "../components/UserContext";
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

export default function AnnouncementData() {
    const [announcements, setAnnouncements] = useState([])
    const {user} = useContext(UserContext)

    async function getAnnouncements() {
        const response = await fetch(`http://localhost:8000/api/announce/announcements?role=${user.role}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const _response = await response.json();

        if (response.ok && _response.announcements) {
            setAnnouncements(_response.announcements);
        } else {
            console.log(_response.error);
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, []);

    async function deleteAnnouncement(announcementId) {
        try {
            const response = await fetch(`http://localhost:8000/api/announce/delete/${announcementId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAnnouncements(announcements.filter(announcement => announcement._id !== announcementId));
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="col-8">
            <Col>
                <Row>
                    <Button as={Link} to="/announcementform" variant={"btn btn-outline-primary"} className="mb-4">
                        Add Announcement
                    </Button>
                </Row>
                <Table responsive="sm" hover className="align-middle">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {announcements.map((announcement) => <tr key={announcement._id}>
                        <td>{announcement.display ? <FaIcons.FaGlasses style={{color: "#0b8c2f"}}/> :
                            <FaIcons.FaGlasses style={{color: "#cfcccc"}}/>}</td>
                        <td>{announcement.title}</td>
                        <td>{announcement.subject}</td>
                        <td>{announcement.role}</td>
                        <td>
                            <Button as={Link} to={`/editannouncement/${announcement._id}`} variant={"btn"}>
                                <FaIcons.FaEdit style={{color: "dodgerblue"}}/>
                            </Button>
                            <Button variant={"btn"} type="submit" onClick={() => deleteAnnouncement(announcement._id)}>
                                <FaIcons.FaTrash style={{color: "dimgray"}}/>
                            </Button>
                        </td>
                    </tr>)}
                    </tbody>
                </Table>
            </Col>

        </Container>
    )
}

