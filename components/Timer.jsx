import React from "react"

export default function Timer(props) {
    const [timer, setTimer] = React.useState("ON PROGRESS")

    function showDuration(){
        setTimer(props.durationFunc(props.duration))
    }
    
    function showText(){
        setTimer("ON PROGRESS")
    }

    return (
        <p  onMouseOver={() => showDuration()} 
            onMouseOut={() => showText()}
            onClick={() => {
                timer === "ON PROGRESS" ? showDuration() : showText()
            }}
        className="seconds">{timer}</p>
    )
}``