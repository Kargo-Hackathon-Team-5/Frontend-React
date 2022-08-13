import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Modal, Row, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';
import moment from 'moment';

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
    truck_license_number: string;
    driver_name: string;
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
    const [dropdown, setDropdown] = useState<string>('Allocate Shipment');
    const [modal_detail, setModalDetail] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')

    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([])

    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalAllocate, setModalAllocate] = useState<boolean>(false);
    const [modalUpdateStatus, setModalUpdateStatus] = useState<boolean>(false);


    const [formData, setFormData] = useState<Shipment>({
        id: '1',
        loading_date: '2022-08-10',
        status: 'created',
        truck_license_number: "B 2323 XDS",
        driver_name: "budi",
        origin: 'Pekalongan',
        destination: 'Jakarta',
    })
    const { id, loading_date, status, truck_license_number, driver_name, origin, destination } = formData;

    const onToggleChanged = (x: Shipment, target: string) => {
        if (target == 'Allocate Shipment') {
            // setDropdown('Allocate Shipment')
        }
        else {
            // setDropdown('Update Status')
        }
    }

    const loadData = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/shipment');
            const newShipments = resp.data.data
            console.log(newShipments);

            const matchedShipments = newShipments.map((x: any) => (
                {
                    id: x.id,
                    loading_date: moment(x.loading_date).format("YYYY-MM-DD"),
                    status: x.status,
                    truck_license_number: x.truck.plate_number,
                    driver_name: x.driver.name,
                    origin: x.origin,
                    destination: x.destination,

                }
            ));
            setShipments(matchedShipments);
            setFilteredShipments(matchedShipments)
        }
        catch (e: any) {
            console.error("Error Fetching", e.message);

            setShipments(dummyShipments);
            setFilteredShipments(dummyShipments)
        }
    }

    useEffect(() => {
        loadData()

    }, [])

    const onClickModal = (shipment: null | Shipment, target: string) => {
        if (shipment) {
            setFormData(shipment);
        }

        if (target == 'add') {
            setModalAdd(true)
            setModalAllocate(false)
            setModalUpdateStatus(false)
        }
        else if (target == 'allocate') {
            setModalAdd(false)
            setModalAllocate(true)
            setModalUpdateStatus(false)
        }
        else {
            setModalAdd(false)
            setModalAllocate(false)
            setModalUpdateStatus(true)
        }
    }

    const onAdd = () => {
        console.log(formData);

        // axios

        setModalAdd(false);

    }

    const onAllocateShipment = () => {
        console.log(formData);

        // axios

        setModalAllocate(false);

    }
    const onUpdateStatus = () => {
        console.log(formData);

        // axios

        setModalUpdateStatus(false);

    }

    const onSearchChange = (e: any): void => {
        setSearch(e.target.value)
        if (e.target.value) {
            setFilteredShipments(shipments.filter(x => (x.id.toLowerCase().includes(e.target.value.toLowerCase()))))
        } else {
            setFilteredShipments(shipments)
        }
    };

    const onChange = (e: any): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <TopNavBar type='shipper' />
            <header className="App-header w-100 min-vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded my-10'>
                    <h2 className='py-2 text-dark'>  Shipments </h2>
                    <hr />
                    <Row className='justify-content-end my-4'>
                        <Col lg="auto">
                            <Button onClick={() => { onClickModal(null, 'add') }} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                Add
                            </Button>
                        </Col>
                        <Col lg={5}>
                            <div className="form-group w-50 mx-auto mt-2">
                                <input type="text" onChange={e => onSearchChange(e)} value={search} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                            </div>
                        </Col>
                    </Row>
                    <Container style={{ fontSize: '1rem' }}>
                        <Row>
                            <Col lg="12">
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                        <tr>
                                            <th>Shipment</th>
                                            <th>License</th>
                                            <th>Driver's Name</th>
                                            <th>Origin</th>
                                            <th>Destination</th>
                                            <th>Loading Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredShipments &&
                                            filteredShipments.map(x =>
                                            (
                                                <tr>
                                                    <td >{x.id}</td>
                                                    <td>{x.truck_license_number}</td>
                                                    <td>{x.driver_name}</td>
                                                    <td>{x.origin}</td>
                                                    <td>
                                                        {x.destination}
                                                    </td>
                                                    <td>
                                                        <Moment format="D MMM YYYY">
                                                            {x.loading_date}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        {x.status}
                                                    </td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                                                {dropdown}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => onClickModal(x, 'allocate')}>Allocate Shipment</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => onClickModal(x, 'status')}>Update Status</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>

                    {/* MODAL FOR ADD */}
                    <Modal
                        show={modalAdd}
                        onHide={() => setModalAdd(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Shipment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">

                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="origin"
                                            >
                                                Origin
                                            </label>
                                            <select
                                                id="origin"
                                                name="origin"
                                                value={origin}
                                                onChange={(e) => {
                                                    onChange(e);
                                                }}
                                            >
                                                {districts.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {String(hour)}
                                                    </option>
                                                ))}
                                            </select>
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="destination"
                                            >
                                                Destination
                                            </label>
                                            <select
                                                id="destination"
                                                name="destination"
                                                value={destination}
                                                onChange={(e) => {
                                                    onChange(e);
                                                }}
                                            >
                                                {districts.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {String(hour)}
                                                    </option>
                                                ))}
                                            </select>

                                        </Row>
                                        <Row className='my-2'>
                                            <label htmlFor="example">Loading Date</label>
                                            <input placeholder="Select date" name='loading_date' value={loading_date} onChange={e => { onChange(e) }} type="date" id="example" className="form-control" />
                                        </Row>

                                        <Row className='my-3 justify-content-center'>
                                            <Button onClick={onAdd} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                                Add
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    {/* MODAL FOR Allocate */}
                    <Modal
                        show={modalAllocate}
                        onHide={() => setModalAllocate(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Allocate Shipment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Truck</label>
                                            <input type="text" name='truck_license_number' value={truck_license_number} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Name" />
                                        </Row>
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Driver</label>
                                            <input type="text" name='driver_name' value={driver_name} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Phone" />
                                        </Row>

                                        <Row className='my-3 justify-content-center'>
                                            <Button onClick={onAllocateShipment} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                                Allocate Shipment
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    {/* MODAL FOR Update Status */}
                    <Modal
                        show={modalUpdateStatus}
                        onHide={() => setModalUpdateStatus(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row>
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="status"
                                            >
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={status}
                                                onChange={(e) => {
                                                    onChange(e);
                                                }}
                                            >
                                                {statuses.map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {String(hour)}
                                                    </option>
                                                ))}
                                            </select>
                                        </Row>

                                        <Row className='my-3 justify-content-center'>
                                            <Button onClick={onUpdateStatus} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                                Update Status
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>


                </div>

            </header >
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
        truck_license_number: "B 2323 XDS",
        driver_name: "budi",
        origin: 'Pekalongan',
        destination: 'Jakarta',
    },
    {
        id: '2',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'allocated',
        truck_license_number: 'B 231 XS',
        driver_name: 'joni',
        origin: 'Semarang',
        destination: 'Tasikmalaya',
    },
    {
        id: '3',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'on_going_to_origin',
        truck_license_number: 'B 234 XDX',
        driver_name: 'soni',
        origin: 'Bogor',
        destination: 'Cirebon',
    },
    {
        id: '4',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'at_origin',
        truck_license_number: 'B 833 XX',
        driver_name: 'dina',
        origin: 'Sukabumi',
        destination: 'Surabaya',
    },
    {
        id: '5',
        loading_date: '2022-08-10T00:00:00Z',
        status: 'at_destination',
        truck_license_number: 'B 8237 SS',
        driver_name: 'doni',
        origin: 'Kediri',
        destination: 'Jember'
    }
]