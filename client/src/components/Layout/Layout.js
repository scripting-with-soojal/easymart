import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={props.description} />
                <meta name='keywords' content={props.keywords} />
                <meta name='author' content={props.author} />
                <title>{props.title}</title>
            </Helmet>
            <Header />
            {/* <br></br>
            <br></br>
            <br></br> */}
            <main style={{ minHeight: '70vh' }}>{props.children}
                <Toaster />
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "ILP",
    description: "MERN Stack Project",
    keywords: "MERN,react,node,mongodb,express",
    author: "Soojal Agrawal"
}

export default Layout