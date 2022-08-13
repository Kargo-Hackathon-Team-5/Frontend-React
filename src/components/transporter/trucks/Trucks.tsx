import Footer from '../../Footer';
import TopNavBar from '../../Navbar';

const backStyle = {
    backgroundImage: "url('https://thumbs.dreamstime.com/b/american-style-truck-freeway-pulling-load-transportation-theme-road-cars-174771780.jpg')",
    backgroundColor: "#cccccc",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};



const Trucks = (): JSX.Element => {

    return (
        <>
            <TopNavBar type='transporter' />
            <header className="App-header w-100 vh-100" style={backStyle}>
                <div className='h-75 w-75 bg-light rounded'>
                    <h2 className='py-2 text-dark'>  Trucks </h2>
                    <hr />

                </div>
            </header>
            <Footer />

        </>

    );
}

export default Trucks;
