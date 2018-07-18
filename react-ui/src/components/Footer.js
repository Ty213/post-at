import React from 'react';

export default () => {
    const footerStyle = {
        backgroundColor: "#e2e2e2",
        textAlign: "center",
        paddingTop: ".50rem",
        paddingBottom: ".50rem"
    }
    const iconStyle = {
        height: "1.5rem"
    }
    return (
    <footer style={footerStyle}>
        <img style={iconStyle} src="plus-symbol.svg" alt="blep cat icon" />
    </footer>
    )
}