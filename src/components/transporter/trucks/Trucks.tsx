import Footer from '../../Footer';
import TopNavBar from '../../Navbar';
import { useState } from 'react';
import { Table, Container, Row, Col, Dropdown, Modal } from "react-bootstrap";

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};



const Trucks = (): JSX.Element => {
    const [dropdown, setDropdown] = useState<string>('Update');
    const [modal_detail, setModalDetail] = useState<boolean>(false);

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
                                    <tr>
                                        <td onClick={() => setModalDetail(true)} style={{ cursor: "pointer" }}>L 1234 VO</td>
                                        <td>Container</td>
                                        <td>Yellow</td>
                                        <td>2022</td>
                                        <td>
                                            Active
                                        </td>
                                        <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                {dropdown}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setDropdown('Update')}>Update</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setDropdown('Add')}>Add</Dropdown.Item>                                                                                                
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </td>
                                    </tr>                                    
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
                                <p>L 1234 VO</p>
                            </Row>
                            <Row>
                                <h5>Truck Type</h5>
                                <p>Container</p>
                            </Row>
                            <Row>
                                <h5>Plate Type</h5>
                                <p>Yellow</p>
                            </Row>
                            <Row>
                                <h5>Production Year</h5>
                                <p>2022</p>
                            </Row>
                            <Row>
                                <h5>Status</h5>
                                <p>Active</p>
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

export default Trucks;
