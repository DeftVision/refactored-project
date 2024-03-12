import { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
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
            await fetch(`http://localhost:8000/api/docs/delete/${documentId}`, {
                method: "DELETE"
            });
            getDocuments();
        }
        catch (error) {
            console.log("Error deleting documents:", error);
        }
    }
    return(
        <Container className="col-8">
            <Table responsive="sm" hover>
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

                        {<Button as={Link} onClick={() => deleteDocument(document._id)}  variant={"btn"}>
                            <FaIcons.FaTrash style={{color: "dimgray"}} />
                        </Button>}</td>
                </tr>)}
                </tbody>
            </Table>
        </Container>
    );
}

;