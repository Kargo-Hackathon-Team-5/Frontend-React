import TopNavBar from '../../Navbar';
import Footer from '../../Footer';

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};



const Shipments = (): JSX.Element => {

    return (
        <>
            <TopNavBar type='shipper' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Shipments </h2>
                    <hr />
                </div>
            </header>
            <Footer />
        </>
    );
}

export default Shipments;
