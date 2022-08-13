import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Footer from './Footer';
import TopNavBar from './Navbar';
import { useNavigate } from "react-router";

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

interface Check {
    transporter: boolean;
    shipper: boolean;
}

const Home = (): JSX.Element => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [check, setCheck] = useState<Check>({
        transporter: false,
        shipper: false
    })
    const { transporter, shipper } = check
    const onClick = async (e: any) => {
        e.preventDefault()
        console.log("Login");
        if (transporter) {
            navigate('/transporter/trucks')
        } else {
            navigate('/shipper/shipments')
        }
    }

    const toggleCheck = (type: string) => {
        if (type == 'transporter') {
            setCheck(check => ({
                shipper: false,
                transporter: !transporter
            }))
        }
        else {
            setCheck(check => ({
                transporter: false,
                shipper: !shipper
            }))
        }
    }
    return (
        <>
            <TopNavBar type='home' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'> Kargo Tech </h2>
                    <hr />
                    <Container className='mt-5'>
                        <Row className='mt-4 w-auto justify-content-center'>
                            <Col sm md={4} lg={5} className="px-5">

                                <div className="form-check text-dark">
                                    <input className="form-check-input" type="checkbox" checked={transporter} defaultChecked={false} onChange={() => { toggleCheck('transporter') }} id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Transporter
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-4 w-auto justify-content-center'>
                            <Col sm md={4} lg={5} className="px-5">

                                <div className="form-check text-dark">
                                    <input className="form-check-input" type="checkbox" checked={shipper} defaultChecked={false} onChange={() => { toggleCheck('shipper') }} id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Shipper
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-4 justify-content-center'>
                            {
                                loading ?
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    :
                                    <Button onClick={onClick} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1.5rem' }}>
                                        Login
                                    </Button>
                            }

                        </Row>

                    </Container>
                </div>

            </header>
            <Footer />
        </>
    );
}

export default Home;
