import { Container, Card, Modal, CloseButton } from "react-bootstrap";
import { useEffect, useState } from 'react'
import * as IoIcons from 'react-icons/io';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [show, setShow] = useState(false)

    async function getAnnouncements() {
        const response = await fetch('http://localhost:8000/api/announce/announcements', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const _response = await response.json();
        if(response.ok && _response.announcements) {
            setAnnouncements(_response.announcements);
        } else {
            console.log(_response.error);
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, []);


    function getModal() {
        setShow(true);
    }

    const handleClose = () => setShow(false);

    const priorityColors = {
        "High": "darkred",
        "Medium": "darkorange",
        "Low": "#515151"
    };


    return(
        <>
        <Container className="mt-5">
            <h3 className="page-title">Announcements</h3>
            {announcements.filter(announcement => announcement.display === true).map((announcement) =>
            <Card key={announcements._id} className="mt-5 shadow" onClick={getModal}>
                <Card.Body>
                    <Card.Title>
                        <Card.Subtitle>
                            <IoIcons.IoIosMegaphone style={{color: priorityColors[announcement.priority]}} />
                            {" "}Priority: {announcement.priority}</Card.Subtitle><br/>
                        <Card.Subtitle>Subject: {announcement.subject}</Card.Subtitle>
                    </Card.Title>
                    <Card.Text>
                        <p className="text-truncate">{announcement.content}</p>
                    </Card.Text>
                </Card.Body>
            </Card>)}
        </Container>

            <Modal show={show} onHide={handleClose} animation key={announcements._id} closeButton>
                <Modal.Body style={{background: priorityColors[announcements.priority], color: "#fff" }}>
                    {announcements.content}
                </Modal.Body>
            </Modal>
        </>

    )
}
