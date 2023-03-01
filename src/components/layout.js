import Header from "./header";
import Footer from "./footer";
import React, { Component }  from 'react';
export default function Layout({children}) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}