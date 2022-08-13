import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Row, Table } from 'react-bootstrap';
import Moment from 'react-moment';

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
    const onSearchChange = (e: any): void => {
        setSearch(e.target.value)
    };
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [dropdown, setDropdown] = useState<string>('Update');
    const [modal_detail, setModalDetail] = useState<boolean>(false);

    const onClick = () => {
        console.log("Update");
    }
    useEffect(() => {
        setDrivers(dummyDrivers);
    }, [])
    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Drivers </h2>
                    <hr />
                    <div className="form-group w-25 mx-auto my-4">
                        <input type="text" onChange={onSearchChange} value={search} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                    </div>
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
                                        {drivers && drivers.map(x => (<>

                                            <tr>
                                                <td onClick={() => setModalDetail(true)} style={{ cursor: "pointer" }}>{x.driver_name}</td>
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
                                                    <Button onClick={onClick} className='w-auto' variant="warning" type="submit" style={{ fontSize: '1rem' }}>
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
        id_card: "",
        driver_license: "",
        status: true
    },
    {
        id: '2',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'joko',
        phone_number: '087743876801',
        id_card: "",
        driver_license: "",
        status: true
    },
    {
        id: '3',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'andi',
        phone_number: '087743972801',
        id_card: "",
        driver_license: "",
        status: true
    },
    {
        id: '4',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'siti',
        phone_number: '087740872801',
        id_card: "",
        driver_license: "",
        status: true
    },
    {
        id: '5',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'dina',
        phone_number: '087233872801',
        id_card: "",
        driver_license: "",
        status: false
    }

]