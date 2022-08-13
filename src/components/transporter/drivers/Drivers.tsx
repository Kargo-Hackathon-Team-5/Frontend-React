import TopNavBar from '../../Navbar';
import Footer from '../../Footer';
import { useState } from 'react';

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

    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Drivers </h2>
                    <hr />
                    <div className="form-group w-25 mx-auto">
                        <input type="text" onChange={onSearchChange} value={search} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                    </div>
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
        id_card: "3525016501830001",
        driver_license: "B 2131 XMS",
        status: true
    },
    {
        id: '2',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'joko',
        phone_number: '087743876801',
        id_card: "3525016501830002",
        driver_license: "B 123 SD",
        status: true
    },
    {
        id: '3',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'andi',
        phone_number: '087743972801',
        id_card: "3525016501830003",
        driver_license: "B 523 XZC",
        status: true
    },
    {
        id: '4',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'siti',
        phone_number: '087740872801',
        id_card: "3525016501830004",
        driver_license: "B 888 HFD",
        status: true
    },
    {
        id: '5',
        created_at: '2022-08-10T00:00:00Z',
        driver_name: 'dina',
        phone_number: '087233872801',
        id_card: "3525016501830005",
        driver_license: "B 773 JKH",
        status: true
    }

]