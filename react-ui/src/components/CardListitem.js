import React from 'react';

const CardListItem = ({ title,content,likes,dislikes }) => {
    const Styles = {
        backgroundColor: "white",
        borderBottom: "1px solid black",
        margin: " 1rem",
        paddingBottom: "1rem"
    }
    const titleStyles = {
        marginBottom: ".75rem"
    }
    const contentStyles = {
        marginBottom: ".75rem",
        fontSize: "1.5rem"
    }
    return (
        <div>
        {console.log(title)}
            <div style={Styles}>
                <h1 style={titleStyles}>{title}</h1>
                <p style={contentStyles}>{content}</p>
                <p>Likes: {likes} </p>
            </div>
        </div>
    )
};

export default CardListItem;