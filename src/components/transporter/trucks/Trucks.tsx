import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
// import Moment from 'react-moment';

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};



interface Truck {
    id: number;
    plate_number: string;
    license_type: string;
    truck_type: string;
    production_year: string;
    stnk: string;
    kir: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}


const Trucks = (): JSX.Element => {
    const [search, setSearch] = useState<string>('')

    const [imageCardId, setImageStnk] = useState<File | null>(null);
    const [imageLicense, setImageKir] = useState<File | null>(null);
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);
    const [dropdown, setDropdown] = useState<string>('Update');
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);


    const onSearchChange = (e: any): void => {
        setSearch(e.target.value)
        if (e.target.value) {
            setFilteredTrucks(trucks.filter(x => (x.plate_number.toLowerCase().includes(e.target.value.toLowerCase()))))
        } else {
            setFilteredTrucks(trucks)
        }
    };
    const onClickModal = (truck: null | Truck, target: string) => {
        if (truck) {
            setFormData(truck);
        }

        if (target === 'add') {
            setModalAdd(true)
            setModalEdit(false)
            setModalDisplay(false)
            setFormData({
                id: 0,
                plate_number: '',
                license_type: '',
                truck_type: '',
                production_year: '',
                stnk: '',
                kir: '',
                status: false,
                createdAt: '',
                updatedAt: ''
            })
        }
        else if (target === 'edit') {
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


    const [formData, setFormData] = useState<Truck>({
        id: 0,
        plate_number: '',
        license_type: '',
        truck_type: '',
        production_year: '',
        stnk: '',
        kir: '',
        status: false,
        createdAt: '',
        updatedAt: ''
    })

    const { id, plate_number, license_type, truck_type, production_year, stnk, kir, status, createdAt, updatedAt } = formData

    const onAdd = () => {
        setFormData(formData => ({
            ...formData            
        }))
        // Add axios post        
    }

    const onEdit = () => {
        setFormData(formData => ({
            ...formData,            
        }))        
    }

    useEffect(() => {
        // setDrivers(dummyDrivers);
        const fetchData = async () => {
            const res = await fetch('http://localhost:3001/api/truck');
            const data = await res.json();
            setTrucks(data.data);
            setFilteredTrucks(data.data);
            // console.log(data.data[0]);
        }
        // setFilteredDrivers(dummyDrivers)
        fetchData();
    }, [])
    const onChange = (e: any): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 min-vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Trucks </h2>
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
                                            <th>Plate Number</th>
                                            <th>License Type</th>
                                            <th>Truck Type</th>
                                            <th>Production Year</th>
                                            <th>status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTrucks && filteredTrucks.map(x => (<>

                                            <tr key={x.id}>
                                                <td onClick={() => { onClickModal(x, 'display') }} style={{ cursor: "pointer" }}>{x.plate_number}</td>
                                                <td>{x.license_type}</td>
                                                <td>
                                                    {x.truck_type}
                                                </td>
                                                <td>
                                                    {x.production_year}
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
                            <Modal.Title>Add Truck</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Plate Number</label>
                                            <input type="text" name='plate_number' value={plate_number} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Plate Number" />
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">License Type</label>
                                            {/* <input type="text" name='license_type' value={license_type} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="License Type" /> */}
                                            <select name="license_type" id="license_type" onChange={e => { onChange(e) }}>
                                                <option value="yellow">Yellow</option>
                                                <option value="black">Black</option>                                                
                                            </select>
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">Truck Type</label>
                                            {/* <input type="text" name='truck_type' value={truck_type} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Truck Type" /> */}
                                            <select name="truck_type" id="truck_type" onChange={e => { onChange(e) }}>
                                                <option value="tronton">Tronton</option>
                                                <option value="container">Container</option>
                                                <option value="cde">CDE</option>
                                            </select>
                                        </Row>
                                        <Row className='my-2'>
                                            <label
                                                className="block text-gray-700 text-md font-bold mb-2 ml-2"
                                                htmlFor="image"
                                            >
                                                STNK
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageStnk(e.target.files ? e.target.files[0] : null)}
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
                                                KIR
                                            </label>
                                            <input
                                                id="image"
                                                onChange={(e) => setImageKir(e.target.files ? e.target.files[0] : null)}
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
                            <Modal.Title>Edit Truck</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="10">
                                        <Row className='my-2'>
                                            <label htmlFor="exampleInputEmail1">Plate Number</label>
                                            <input type="text" name='plate_number' value={plate_number} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Plate Number" />
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">License Type</label>
                                            <input type="text" name='license_type' value={license_type} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="License Type" />
                                        </Row>
                                        <Row>
                                            <label htmlFor="exampleInputEmail1">Truck Type</label>
                                            <input type="text" name='truck_type' value={truck_type} onChange={e => { onChange(e) }} className="form-control" id="exampleInputEmail1" placeholder="Truck Type" />
                                        </Row>   
                                        <Row className="mt-5">
                                            <Button className='w-auto' variant="primary" type="submit" style={{ fontSize: '1rem' }}>
                                                Save
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
                            <Modal.Title>Truck Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col lg="6">
                                        <Row className='my-2'>
                                            <h3>Plate Number : {plate_number}</h3>
                                        </Row>
                                        <Row>
                                            <h3>License Type : {license_type}</h3>
                                        </Row>
                                        <Row>
                                            <h3>Truck Type : {truck_type}</h3>
                                        </Row>                                                                                
                                    </Col>
                                    <Col lg="6">
                                        <Row className='my-2'>
                                            <h3>STNK</h3>
                                            <img src={stnk} className="img-fluid" alt="Responsive image"></img>
                                        </Row>
                                        <Row className='my-2'>
                                            <h3>KIR</h3>
                                            <img src={kir} className="img-fluid" alt="Responsive image"></img>
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

export default Trucks;