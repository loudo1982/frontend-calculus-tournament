import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import banner2 from '../images/banner2.png'
import Image from 'next/image'
import Header from './Header';

const Layout = ({children}) => {
    return (
        <>
        <Head>
            <title>Torneo de cultura general</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </Head>
        

        <div className="min-h-screen bg-red-300 w-full ">
            <div><Image  src={banner2} alt="Banner" /></div>
        
        
            <Sidebar />
           
            {children}



            

            </div>
        
        </>
    );
};

export default Layout;