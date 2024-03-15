import { Container, Col, Row } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import {FaI} from "react-icons/fa6";

export default function AdminDefault () {

    return (
        <Container className="col-8">
            <Col>
                <Row className="mt-5">
                    <h5 style={{textTransform: "uppercase"}} className="align-text-bottom"><FaIcons.FaAngleLeft style={{marginRight: "10px"}}/>select a data source</h5>
                </Row>
            </Col>
        </Container>
    )
}

