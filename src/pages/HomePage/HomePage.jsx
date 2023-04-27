import styles from './HomePage.module.css';
import HomePageHero from '../../components/HomePageHero/HomePageHero';
import Students from '../../components/Students/Students';
import Services from '../../components/Services/Services';

const HomePage = () => {
    return (
        <>
            <div className={styles.homePage}>
                <HomePageHero />
                <Students />
                <Services />
            </div>
        </>
    );
};

export default HomePage;
