import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useState } from 'react';
import { Col, Container, Dropdown, Row, Table } from 'react-bootstrap';

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

interface Shipment {
    id: string;
    loading_date: string;
    status: string;
    truck_id: string | null;
    driver_id: string | null;
    origin: string;
    destination: string;
}

const districts: string[] = [
    'Magelang',
    'Pekalongan',
    'Rembang',
    'Salatiga',
    'Semarang',
    'Tegal',
    'Banyuwangi',
    'Blitar',
    'Jember',
    'Kediri',
    'Madiun',
    'Malang',
    'Pasuruan',
    'Probolinggo',
    'Surabaya',
    'Tuban',
    'Jakarta',
    'Bandung',
    'Bogor',
    'Cirebon',
    'Sukabumi',
    'Tasikmalaya'
]

const statuses = [
    'created',
    'allocated',
    'on_going_to_origin',
    'at_origin',
    'on_going_to_destination',
    'at_destination',
    'completed'
]


const Shipments = (): JSX.Element => {
    const [dropdown, setDropdown] = useState<string>('Update');
    const [modal_detail, setModalDetail] = useState<boolean>(false);
    return (
        <>
            <TopNavBar type='shipper' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Shipments </h2>
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
        </>
    );
}

export default Shipments;


const dummyShipments: Shipment[] = [
    {
        id: '1',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'created',
        truck_id: null,
        driver_id: null,
        origin: 'Pekalongan',
        destination: 'Jakarta',
    },
    {
        id: '2',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'allocated',
        truck_id: '1',
        driver_id: '2',
        origin: 'Semarang',
        destination: 'Tasikmalaya',
    },
    {
        id: '3',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'on_going_to_origin',
        truck_id: '3',
        driver_id: '3',
        origin: 'Bogor',
        destination: 'Cirebon',
    },
    {
        id: '4',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'at_origin',
        truck_id: '4',
        driver_id: '4',
        origin: 'Sukabumi',
        destination: 'Surabaya',
    },
    {
        id: '5',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'at_destination',
        truck_id: '5',
        driver_id: '5',
        origin: 'Kediri',
        destination: 'Jember'
    }
]