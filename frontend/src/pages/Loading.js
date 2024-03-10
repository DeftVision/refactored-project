import { Container } from 'react-bootstrap';
import { RotatingLines } from "react-loader-spinner";

export default function Loading () {
    return (
        <Container style={{display: "flex", flexDirection: "row", justifyContent: "center"}} className="mt-5">
            <RotatingLines
                strokeColor="#515151"
                strokeWidth="3"
                animationDuration="1"
                width="96"
                visible={true}
            />
        </Container>
    );
};

