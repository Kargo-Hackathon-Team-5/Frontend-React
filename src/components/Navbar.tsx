import { Container, Nav, Navbar } from "react-bootstrap";


interface TopNavProps{
    type : string;
}


const TopNavBar = ({ type } : TopNavProps): JSX.Element => {
    return (
        <Navbar bg="light" variant="light">
            <Container className="justify-content-start">
                <Navbar.Brand href="#home">Kargo Excellerate</Navbar.Brand>
                <Nav className="me-10">
                    {type == 'transporter' &&
                        <>
                            <Nav.Link href="#features">Trucks</Nav.Link>
                            <Nav.Link href="#pricing">Drivers</Nav.Link>
                        </>
                    }
                    {type == 'shipper' &&
                        <Nav.Link href="#home">Shipments</Nav.Link>

                    }

                </Nav>
            </Container>
        </Navbar>
    );
}

export default TopNavBar;