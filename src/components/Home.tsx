import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { constants } from 'perf_hooks';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Form, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router";

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};



const Home = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)

    const onClick = async (e: any) => {
        e.preventDefault()
        console.log("Submitted");

    }
    return (
        <header className="App-header w-100 vh-100" style={backStyle}>
            <div className='h-75 w-75 bg-light rounded'>
                <h2 className='py-2 text-dark'> Kargo Tech </h2>
                <hr />
                <Container className='mt-5'>
                    <Row className='mt-4 justify-content-center'>
                        {
                            loading ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                :
                                <Button onClick={onClick} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1.3rem' }}>
                                    Login
                                </Button>
                        }

                    </Row>
                </Container>
            </div>

        </header>
        // <h1> test </h1>
    );
}

export default Home;
