import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </>
    );
};

export default Layout;
