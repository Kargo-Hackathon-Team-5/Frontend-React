import Footer from '../../Footer';
import TopNavBar from '../../Navbar';
import { useState } from 'react';
import { Table, Container, Row, Col, Button, Modal } from "react-bootstrap";

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};


interface Truck {
    license_number: string;
    truck_type: string;
    plate_type: string;
    production_year: string;
    status: boolean;
    stnk: string;
    kir: string;
}


const Trucks = (): JSX.Element => {    
    const [modal_detail, setModalDetail] = useState<boolean>(false);
    const [modal_data_index, setModalDataIndex] = useState<number>(0)

    const handleModal = (status: boolean, index: number) => {
        setModalDetail(status)        
        setModalDataIndex(index)
    }

    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Trucks </h2>
                    <hr />                    
                    <Container>
                        <Row>
                            <Col lg="12">
                                <Table striped bordered hover size='sm'>                    
                                <thead>
                                    <tr>                                    
                                        <th>License Number</th>
                                        <th>Truck Type</th>
                                        <th>Plate Type</th>
                                        <th>Production Year</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyTruck.map((truck: Truck, index: number) => {
                                      return(
                                        <tr key={index}>
                                            <td style={{ cursor: "pointer" }} onClick={() => handleModal(true, index)}>{truck.license_number}</td>
                                            <td>{truck.truck_type}</td>
                                            <td>{truck.plate_type}</td>
                                            <td>{truck.production_year}</td>
                                            <td>{truck.status ? 'Active' : 'Inactive'}</td>
                                            <td>
                                                <Button>
                                                    Update
                                                </Button>
                                            </td>
                                        </tr>
                                      )  
                                    })}                                    
                                </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </header>
            <Footer />

            <Modal
            show={modal_detail}
            onHide={() => setModalDetail(false)}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Truck Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container>
                    <Row>
                        <Col lg="6">
                            <Row>
                                <h5>License Number</h5>
                                <p>{dummyTruck[modal_data_index].license_number}</p>
                            </Row>
                            <Row>
                                <h5>Truck Type</h5>
                                <p>{dummyTruck[modal_data_index].truck_type}</p>
                            </Row>
                            <Row>
                                <h5>Plate Type</h5>
                                <p>{dummyTruck[modal_data_index].plate_type}</p>
                            </Row>
                            <Row>
                                <h5>Production Year</h5>
                                <p>{dummyTruck[modal_data_index].production_year}</p>
                            </Row>
                            <Row>
                                <h5>Status</h5>
                                <p>{dummyTruck[modal_data_index].status}</p>
                            </Row>
                        </Col>
                        <Col lg="6">
                            <Row>
                                <h5>STNK</h5>
                                <p>Image Here</p>
                                <small>Upload Time</small>
                            </Row>
                            <Row>
                                <h5>KIR</h5>
                                <p>Image Here</p>
                                <small>Upload Time</small>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                </Modal.Body>                
            </Modal>
        </>

    );
}

const dummyTruck: Truck[] = [
    {
        license_number: 'L 1234 VO',
        truck_type: 'Container',
        plate_type: 'Yellow',
        production_year: '2022',
        status: true,
        stnk: 'Image Here',
        kir: 'Image Here'
    },
    {
        license_number: 'L 1234 BO',
        truck_type: 'Container',
        plate_type: 'Black', 
        production_year: '2021',
        status: true,
        stnk: 'Image Here',
        kir: 'Image Here'
    }

]

export default Trucks;
