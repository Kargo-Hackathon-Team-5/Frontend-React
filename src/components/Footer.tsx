import { Container, Nav, Navbar } from "react-bootstrap";


const Footer = (): JSX.Element => {
    return (
        <Navbar bg="light" variant="light" className='justify-content-center'>
            <p className="text-center pt-2 text-dark">
                Group 5 Kargo Excellerate Hackathons © 2022 Copyright
            </p>
        </Navbar>
    );
}

export default Footer;