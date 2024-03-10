import { Container } from 'react-bootstrap';
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
    return (
        <Container>
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

export default Loading;