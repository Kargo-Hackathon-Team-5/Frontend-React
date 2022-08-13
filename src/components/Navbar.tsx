import { Container, Nav, Navbar } from "react-bootstrap";


interface TopNavProps{
    type : string;
}


const TopNavBar = ({ type } : TopNavProps): JSX.Element => {
    return (
        <Navbar bg="light" variant="light">
            <Container className="justify-content-start">
                <Navbar.Brand href="/">Kargo Excellerate</Navbar.Brand>
                <Nav className="me-10">
                    {type == 'transporter' &&
                        <>
                            <Nav.Link href="/transporter/trucks">Trucks</Nav.Link>
                            <Nav.Link href="/transporter/drivers">Drivers</Nav.Link>
                        </>
                    }
                    {type == 'shipper' &&
                        <Nav.Link href="/shipper/shipments">Shipments</Nav.Link>

                    }

                </Nav>
            </Container>
        </Navbar>
    );
}

export default TopNavBar;