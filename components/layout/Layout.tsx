import Footer from './footer/Footer'
import Header from './header/Header'
import Meta from './Meta'
import Modals from "./modals/Modals";

export default function Layout({children}) {
    return (
        <>
            <Meta/>
            <Header/>
            <main>{children}</main>
            <Footer/>
            <Modals/>
        </>
    )
}