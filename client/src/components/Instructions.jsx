import React from 'react'

const Instructions = () => {
    const handleLogout = function(){
        localStorage.removeItem("token");
        alert("Logged out successfully!");
    }
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Instructions