import React from "react"

export default function Timer(props) {
    return (
        <p className="seconds">{props.durationFunc(props.duration)}</p>
    )
}