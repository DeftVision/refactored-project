import {Container, Card} from "react-bootstrap";
import {useEffect, useContext, useState} from 'react'
import * as IoIcons from 'react-icons/io';
import UserContext from "../components/UserContext";


const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const {user} = useContext(UserContext);


    async function getAnnouncements() {


        const response = await fetch(`http://localhost:8000/api/announce/announcements?role=${user.role}&display=${true}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const _response = await response.json();
        if (response.ok && _response.announcements) {
            setAnnouncements(_response.announcements)

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
        "Low": "#515151"
    };


    return (
        <>
            <Container className="mt-5">
                <h3 className="page-title">Announcements</h3>
                {announcements.map((announcement) =>
                    <Card key={announcement._id} className="mt-5 shadow">
                        <Card.Body>
                            <Card.Title>
                                <Card.Subtitle>
                                    <IoIcons.IoIosMegaphone style={{color: priorityColors[announcement.priority]}}/>
                                    {" "}Priority: {announcement.priority}</Card.Subtitle><br/>
                                <Card.Subtitle>Subject: {announcement.subject}</Card.Subtitle>
                            </Card.Title>
                            <Card.Text>
                                <p>{announcement.content}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>)}
            </Container>
        </>
    )
}

export default Announcements;