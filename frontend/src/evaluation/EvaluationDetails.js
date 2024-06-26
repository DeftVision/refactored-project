import {Col, Container, Table} from 'react-bootstrap';
import {useEffect, useState} from "react";
import UserContext from '../components/UserContext'
import {useParams} from 'react-router-dom';
import {format} from 'date-fns';


const EvaluationDetails = ({evaluation}) => {
    const {id} = useParams();
    const [shopperImage, setShopperImage] = useState(UserContext);

    async function getEvaluations() {

        try {
            const response = await fetch(`http://localhost:8000/api/eval/evaluation/${id}`, {
                method: "GET",
            });
            const _response = await response.json();
            if (response.ok && _response.evaluation) {
                setShopperImage(_response.image)

            } else {
                console.log(_response.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvaluations();

    }, []);

    return (
        <Container style={{display: "flex"}}>
            <Col>
                <h4 className="mb-5">
                    <span
                        style={{color: "#515151"}}>{evaluation.location}</span>: {format(new Date(evaluation.visitDateTime), "MMMM dd, yyyy h:mm a")}
                </h4>
                <Table responsive
                       style={{
                           alignContent: "middle",
                           textAlign: "left"
                       }}>

                    <tbody>
                    <tr>
                        <td>Warm Aloha Greeting</td>
                        <td>{evaluation.greeting ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Repeated back the order</td>
                        <td>{evaluation.repeatOrder ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Guest offered sweet potato fries</td>
                        <td>{evaluation.repeatOrder ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Patio was clean and organized</td>
                        <td>{evaluation.patio ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Manager was identifiable</td>
                        <td>{evaluation.identifyManager ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Waiting for food [in minutes]</td>
                        <td>{evaluation.wait}</td>
                    </tr>
                    <tr>
                        <td>Food Score</td>
                        <td>{evaluation.foodScore}</td>
                    </tr>
                    <tr>
                        <td>Service Score</td>
                        <td>{evaluation.serviceScore}</td>
                    </tr>
                    <tr>
                        <td>Appearance Score</td>
                        <td>{evaluation.appearanceScore}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <span className="">Comments</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>{evaluation.comments}</td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <image source={shopperImage} style={{width: "200px", height: "150px"}}/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Col>

        </Container>
    );
};

export default EvaluationDetails;
