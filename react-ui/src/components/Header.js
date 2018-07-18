import React from 'react';

export default () => {
    const headerStyle = {
        backgroundColor: "#323031",
        textAlign: "center",
        paddingTop: ".25rem",
        paddingBottom: ".25rem"
    }
    const iconStyle = {
        height: "2.75rem",
    }
    return (
    <header style={headerStyle}>
        <img style={iconStyle} src="blep-cat.svg" alt="blep cat icon" />
    </header>
    )
}

