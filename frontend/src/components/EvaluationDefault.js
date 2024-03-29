import {Container, Col, Row} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';

export default function EvaluationDefault() {

    return (
        <Container className="col-8">
            <Col>
                <Row className="mt-5">
                    <h5 style={{textTransform: "uppercase"}} className="align-text-bottom">
                        <FaIcons.FaAngleLeft style={{marginRight: "10px"}}/>
                        select an evaluation record
                    </h5>
                </Row>
            </Col>
        </Container>
    )
}

