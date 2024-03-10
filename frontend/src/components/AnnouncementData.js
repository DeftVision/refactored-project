import { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

export default function AnnouncementData () {
    const [announcements, setAnnouncements] = useState([])

    async function getAnnouncements() {
        const response = await fetch("http://localhost:8000/api/announce/announcements", {
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
            await fetch(`http://localhost:8000/api/announce/delete/${announcementId}`, {
                method: "DELETE",
            });
            getAnnouncements()
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Table responsive hover>
                <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Audience</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {announcements.map((announcement) => <tr key={announcement._id}>
                    <td>{announcement.display ?  <FaIcons.FaGlasses style={{color: "#0b8c2f"}}/> : <FaIcons.FaGlasses style={{color: "#cfcccc"}}/>}</td>
                    <td>{announcement.title}</td>
                    <td>{announcement.subject}</td>
                    <td>{announcement.audience}</td>
                    <td>
                        <Button as={Link} to={`/editannouncement/${announcement._id}`} variant={"btn"}>
                            <FaIcons.FaEdit style={{color: "dodgerblue"}} />
                        </Button>
                        <Button variant={"btn"} type="submit" onClick={() => deleteAnnouncement(announcement._id)}>
                            <FaIcons.FaTrash style={{color: "#aaa"}}  />
                        </Button>
                    </td>
                </tr>)}
                </tbody>
            </Table>

        </Container>
    )
}

