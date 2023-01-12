import React from 'react'

const NotFound: React.FunctionComponent = () => {
    const style = {
        backgroundColor: "white",
        margin: "50px",
        padding: "30px",
        borderRadius: "6px"
    }

    return (
        <div style={style}>
            <h1>Vous êtes perdu.</h1>
            <h3>Saisir "Alt+F4" pour retrouver votre chemin.</h3>
        </div>
    )
}

export default NotFound;
