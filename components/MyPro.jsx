import React from "react";
import {select, line, curveCardinal} from "d3";

export default function MyProductivity(){

    const [data, setData] = React.useState([25,30,45,60,20,70,85])
    const svgRef = React.useRef()

    React.useEffect(() => {
        console.log(svgRef)
        const svg = select(svgRef.current)
        const myLine = line()
            .x((value, index) => index * 50)
            .y(value => 150 - value)
            .curve(curveCardinal)
        svg
            .selectAll("path")
            .data([data])
            .join("path")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "blue")
    }, [data])

    return (
        <section>
            <h1>Your Productivity</h1>
            <svg className="svg-d" ref={svgRef}></svg>
        </section>
    )
}