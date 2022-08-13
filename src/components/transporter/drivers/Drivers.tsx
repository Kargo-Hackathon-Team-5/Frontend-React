import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Modal, Row, Table } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

interface Driver {
    id: string;
    created_at: string;
    driver_name: string;
    phone_number: string;
    id_card: string;
    driver_license: string;
    status: boolean
}


const Drivers = (): JSX.Element => {
    const [search, setSearch] = useState<string>('')

    const [imageCardId, setImageCardId] = useState<File | null>(null);
    const [imageLicense, setImageLicense] = useState<File | null>(null);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
    const [dropdown, setDropdown] = useState<string>('Update');

    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);


    const onSearchChange = (e: any): void => {
        setSearch(e.target.value)
        if (e.target.value) {
            setFilteredDrivers(drivers.filter(x => (x.driver_name.toLowerCase().includes(e.target.value.toLowerCase()))))
        } else {
            setFilteredDrivers(drivers)
        }
    };
    const onClickModal = (driver: null | Driver, target: string) => {
        if (driver) {
            setFormData(driver);
        }

        if (target == 'add') {
            setModalAdd(true)
            setModalEdit(false)
            setModalDisplay(false)
        }
        else if (target == 'edit') {
            setModalAdd(false)
            setModalEdit(true)
            setModalDisplay(false)
        }
        else {
            setModalAdd(false)
            setModalEdit(false)
            setModalDisplay(true)
        }
    }

    const [formData, setFormData] = useState<Driver>({
        id: '',
        created_at: '',
        driver_name: '',
        phone_number: '',
        id_card: '',
        driver_license: '',
        status: false
    })

    const { id, created_at, driver_name, phone_number, id_card, driver_license, status } = formData

    const onAdd = () => {
        setFormData(formData => ({
            ...formData,
            id_card: 'https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg',
            driver_license: 'https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg',
            status: true
        }))
        // Add axios post
        console.log(({
            ...formData,
            id_card: 'https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg',
            driver_license: 'https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg',
            status: true
        }));

        setModalAdd(false);
    }

    const onEdit = () => {
        setFormData(formData => ({
            ...formData,
            id_card: 'https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg',
            driver_license: 'https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg',
            status: true
        }))
        // Add axios post
        console.log(({
            ...formData,
            id_card: 'https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg',
            driver_license: 'https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg',
            status: true
        }));

        setModalEdit(false);
    }

    const loadData = async () => {
        try {
            const resp = await axios.get('http://localhost:3001/api/driver');
            const newDrivers = resp.data.data
            console.log(newDrivers);

            const matchedDrivers = newDrivers.map((x: any) => (
                {
                    id: x.id,
                    created_at: x.createdAt,
                    driver_name: x.name,
                    phone_number: x.phone,
                    id_card: x.id_card,
                    driver_license: x.license,
                    status: x.status

                }
            ));
            setDrivers(matchedDrivers);
            setFilteredDrivers(matchedDrivers)
        }
        catch (e: any) {
            console.error("Error Fetching", e.message);

            setDrivers(dummyDrivers);
            setFilteredDrivers(dummyDrivers)
        }
    }

    useEffect(() => {
        loadData()

    }, [])
    const onChange = (e: any): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 min-vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Drivers </h2>
                    <hr />
                    <Row className='justify-content-end my-4'>
                        <Col lg="auto">
                            <Button onClick={() => { onClickModal(null, 'add') }} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                Add
                            </Button>
                        </Col>
                        <Col lg={5}>
                            <div className="form-group w-50 mx-auto mt-2">
                                <input type="text" onChange={onSearchChange} value={search} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                            </div>
                        </Col>
                    </Row>

                    <Container style={{ fontSize: '1.3rem' }}>
                        <Row>
                            <Col lg="12">
                                <Table striped bordered hover size='sm'>
                                    <thead>
                                        <tr>
                                            <th>driver Name</th>
                                            <th>Phone Number</th>
                                            <th>Created At</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDrivers && filteredDrivers.map(x => (<>

                                            <tr>
                                                <td onClick={() => { onClickModal(x, 'display') }} style={{ cursor: "pointer" }}>{x.driver_name}</td>
                                                <td>{x.phone_number}</td>
                                                <td>
                                                    <Moment format="D MMM YYYY">
                                                        {x.created_at}
                                                    </Moment>

                                                </td>
                                                <td>
                                                    {x.status ? 'Active' : 'Inactive'}
                                                </td>
                                                <td>
                                                    <Button onClick={() => { onClickModal(x, 'edit') }} className='w-auto' variant="warning" type="submit" style={{ fontSize: '1rem' }}>
                                                        Update
                                                    </Button>
                                                </td>
                                            </tr>

                                        </>))}

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
                            <Modal.Title>Add Driver</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Driver Name</label>
                                            <input type="text" name='driver_name' value={driver_name} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Name" />
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">Phone Number</label>
                                            <input type="text" name='phone_number' value={phone_number} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Phone" />
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-md font-bold mb-2 ml-2"
                                                htmlFor="image"
                                            >
                                                ID Card
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageCardId(e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-md text-white bg-gray-800 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ml-2"
                                                type="file"
                                            />
                                            <p
                                                className="mt-1 text-sm text-gray-500 ml-2"
                                                id="file_input_help"
                                            >
                                                SVG, PNG, or JPG.
                                            </p>
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-md font-bold mb-2 ml-2"
                                                htmlFor="image"
                                            >
                                                Driver License
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageLicense(e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-md text-white bg-gray-800 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ml-2"
                                                type="file"
                                            />
                                            <p
                                                className="mt-1 text-sm text-gray-500 ml-2"
                                                id="file_input_help"
                                            >
                                                SVG, PNG, or JPG.
                                            </p>
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

                    {/* MODAL FOR EDIT */}
                    <Modal
                        show={modalEdit}
                        onHide={() => setModalEdit(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Driver</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Driver Name</label>
                                            <input type="text" name='driver_name' value={driver_name} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Name" />
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">Phone Number</label>
                                            <input type="text" name='phone_number' value={phone_number} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Phone" />
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-md font-bold mb-2 ml-2"
                                                htmlFor="image"
                                            >
                                                ID Card
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageCardId(e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-md text-white bg-gray-800 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ml-2"
                                                type="file"
                                            />
                                            <p
                                                className="mt-1 text-sm text-gray-500 ml-2"
                                                id="file_input_help"
                                            >
                                                SVG, PNG, or JPG.
                                            </p>
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-md font-bold mb-2 ml-2"
                                                htmlFor="image"
                                            >
                                                Driver License
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageLicense(e.target.files ? e.target.files[0] : null)}
                                                className="block w-full text-md text-white bg-gray-800 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ml-2"
                                                type="file"
                                            />
                                            <p
                                                className="mt-1 text-sm text-gray-500 ml-2"
                                                id="file_input_help"
                                            >
                                                SVG, PNG, or JPG.
                                            </p>
                                        </Row>
                                        <Row className='my-3 justify-content-center'>
                                            <Button onClick={onEdit} className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                                Add
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    {/* MODAL FOR Display */}
                    <Modal
                        show={modalDisplay}
                        onHide={() => setModalDisplay(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Display Driver</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <h3>Name : {driver_name}</h3>
                                        </Row>
                                        <Row>
                                            <h3>Phone : {phone_number}</h3>
                                        </Row>
                                        <Row className='my-2'>
                                            <h3>ID Card</h3>
                                            <img src={id_card} className="img-fluid" alt="Responsive image"></img>
                                        </Row>
                                        <Row className='my-2'>
                                            <h3>Driver License</h3>
                                            <img src={driver_license} className="img-fluid" alt="Responsive image"></img>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                </div>
            </header>
            <Footer />
        </>
    );
}

export default Drivers;



const dummyDrivers: Driver[] = [
    {
        id: '1',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'budi',
        phone_number: '087743872841',
        id_card: "https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg",
        driver_license: "https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg",
        status: true
    },
    {
        id: '2',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'joko',
        phone_number: '087743876801',
        id_card: "https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg",
        driver_license: "https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg",
        status: true
    },
    {
        id: '3',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'andi',
        phone_number: '087743972801',
        id_card: "https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg",
        driver_license: "https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg",
        status: true
    },
    {
        id: '4',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'siti',
        phone_number: '087740872801',
        id_card: "https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg",
        driver_license: "https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg",
        status: true
    },
    {
        id: '5',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'dina',
        phone_number: '087233872801',
        id_card: "https://iskconofescondido.com/wp-content/uploads/2019/03/FAKE-KTP.jpg",
        driver_license: "https://i.pinimg.com/originals/7f/7f/68/7f7f68a2ae2a33c4c67d10234cc7bb37.jpg",
        status: false
    }

]