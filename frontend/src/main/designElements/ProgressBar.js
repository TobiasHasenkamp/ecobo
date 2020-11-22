import React from "react";


export default function ProgressBar({percentCompleted}) {

    const progressBarStyle = {
        height: 20,
        width: '75%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const completedPercentStyle = {
        height: '100%',
        width: `${percentCompleted}%`,
        backgroundColor: "grey",
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }

    const labelStyle = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    const percentCompletedFloor = Math.floor(percentCompleted);

    return(
        <div style={progressBarStyle}>
            <div style={completedPercentStyle}>
                <span style={labelStyle}>
                    {`${percentCompletedFloor}%`}
                </span>
            </div>

        </div>
    )
}
