import {Container, Image} from 'react-bootstrap';

import {Link} from "react-router-dom";

const Documents = () => {


    return (
        <Container className="mt-5">
            <h3 className="page-title">Documents</h3>

            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=menu"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=safety"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=process"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=form"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=training"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=cleaning"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
            <Image as={Link} to="/"
                   src={"https://fakeimg.pl/200x200?text=recipe"}
                   style={{cursor: "pointer", borderRadius: "8px"}}
                   className=" mt-5 shadow m-4"
            />
        </Container>
    );
};

export default Documents;

