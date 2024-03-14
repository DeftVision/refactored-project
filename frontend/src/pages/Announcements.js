import { Container, Card } from "react-bootstrap";
import { useEffect, useState } from 'react'
import * as IoIcons from 'react-icons/io';



export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);

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


    const priorityColors = {
        "High": "darkred",
        "Medium": "darkorange",
        "Low": "#178178178"
    };


    return(
        <Container className="mt-5">
            <h3 className="page-title">Announcements</h3>

            {announcements.map((announcement) =>
            <Card key={announcements._id} className="mt-5 shadow" style={{}}>
                <Card.Body>
                    <Card.Title>
                        <Card.Subtitle><IoIcons.IoIosMegaphone style={{color: priorityColors[announcement.priority]}} />
                            {" "}Priority: {announcement.priority}</Card.Subtitle><br/>
                        <Card.Subtitle>Subject: {announcement.subject}</Card.Subtitle>
                    </Card.Title>
                    <Card.Text>
                        <p>{announcement.content}</p>
                    </Card.Text>
                </Card.Body>
            </Card>)}



        </Container>
    )
}



