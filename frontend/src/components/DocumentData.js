import { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";

export default function DocumentData () {
    const [documents, setDocuments] = useState([]);


    async function getDocuments() {
        try {
            const response = await fetch("http://localhost:8000/api/docs/documents", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const _response = await response.json();

            if (response.ok && _response.documents) {
                setDocuments(_response.documents);
            } else {
                console.log(_response.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDocuments();
    }, []);

    async function deleteDocument(documentId) {
        try {
            const response = await fetch(`http://localhost:8000/api/docs/delete/${documentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setDocuments(documents.filter(document => document._id !== documentId));
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return(
        <Container className="col-8" style={{display: "flex", flex: "30%", alignItems: "center"}}>
            <Col>
            <Row>
                <Button as={Link} to="/documentform" variant={"btn btn-outline-primary"} className="mb-4">Add New File</Button>
            </Row>
            <Row>
            <Table responsive="sm" hover className="align-middle">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {documents.map((document) => <tr key={document._id}>
                    <td>{document.docName}</td>
                    <td>{document.category}</td>
                    <td>
                        {<Button as={Link} to={`/editdocument/${document._id}`} variant={"btn"}>
                            <FaIcons.FaEdit style={{color: "dodgerblue"}} />
                        </Button>}

                        {<Button variant={"btn"} type="submit" onClick={() => deleteDocument(document._id)}>
                            <FaIcons.FaTrash style={{color: "dimgray"}} />
                        </Button>}</td>
                </tr>)}
                </tbody>
            </Table>
            </Row>
            </Col>
        </Container>
    );
}

;