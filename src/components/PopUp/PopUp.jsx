import React, { useState } from 'react';
import './PopUp.scss';

const PopUp = ({ message, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

const PopUpExample = () => {
    const [showPopUp, setShowPopUp] = useState(false);

    const handleOpenPopUp = () => {
        setShowPopUp(true);
    };

    const handleClosePopUp = () => {
        setShowPopUp(false);
    };

    return (
        <div>
            <button onClick={handleOpenPopUp}>Show Pop Up</button>
            {showPopUp && <PopUp message="This is a pop up message!" onClose={handleClosePopUp} />}
        </div>
    );
};

export default PopUpExample;