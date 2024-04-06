import {Container, Col, Row} from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';


const EvaluationDefault = () => {

    return (
        <Container className="col-8">
            <Col>
                <Row className="mt-5">
                    <h5 style={{textTransform: "uppercase"}} className="align-text-bottom">
                        <span className="admin-default-icon"> <FaIcons.FaAngleLeft
                            style={{marginRight: "10px"}}/>
                        </span>select date
                    </h5>
                </Row>
            </Col>
        </Container>
    )
}

export default EvaluationDefault;