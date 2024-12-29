import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles['not-found-container']}>
            <h3>
                Page Not Found
            </h3>
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/" className={styles['home-link']}>Go to Home</Link>
        </div>
    );
};

export default NotFoundPage;