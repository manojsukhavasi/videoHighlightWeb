import React from 'react';
import { Spinner } from 'react-bootstrap';


export class GlobalSpinner extends React.Component {
    render() {
        return (
            <>
                <div style={{ position: "fixed", zIndex: 100, top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "#ffffff00" }}>
                    <Spinner animation="border" variant="light" style={{ left: "45%", right: "48%", top: "40%", bottom: "50%", margin: "0 auto", position: "relative" }}></Spinner>
                </div>
            </>
        );
    }
}  