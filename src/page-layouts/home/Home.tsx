import Hero from './hero/Hero'
import Layout from '../../components/layout/Layout'
import AboutSection from './about-section/AboutSection'
import HomeMeta from './HomeMeta'
import CVSection from './cv-section/CVSection'
import PricesSection from './prices-section/PricesSection'
import TestSection from './test-section/TestSection'

const Home: React.FC = () => {
    return (
        <>
            <HomeMeta />
            <div className="home page landing">
                <Layout>
                    <Hero />
                    {/* <CVSection /> */}
                    <TestSection />
                    {/* <PricesSection /> */}
                    <AboutSection />
                </Layout>
            </div>
        </>
    )
}

export default Home
