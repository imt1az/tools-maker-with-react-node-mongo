import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Services from './Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Footer></Footer>
        </div>
    );
};

export default Home;