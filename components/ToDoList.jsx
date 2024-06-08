import React from "react"
import { faSquareMinus, faCirclePlay, faSquareCheck } from "@fortawesome/free-regular-svg-icons"
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Timer from "./Timer"

export default function ToDoList(props){

    const [showFav, setShowFav] = React.useState(false)

    const favItemsStyle = {
        display: showFav ? "flex" : "none"
    }

    const favStyles = {
        overflowY: showFav ? "scroll" : "none",
        minHeight: "5em",
        maxHeight: "15em",
        scrollbarWidth: "thin",
        scrollbarColor: "gold white"
    }

    const duration = function calculateTime(time){
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        return `${ minutes < 10 
                    ? "0" 
                    : ""
                }${minutes}m
                :${ seconds < 10 
                    ? " 0" 
                    : ""
                }${seconds}s`
    }


    const toDoElements = props.items.map(item => {
        
        const styles = {
            textDecorationLine: item.isFinished ? "line-through" : "none"
        }

        const starStyles  = {
            color: item.isFavorite ? "gold" : "grey"
        }

        const playStyles = {
            transform: item.isOn ? "rotate(-0.5turn)" : "none"
        }

        item.isOn ? (
            setInterval(() => {
                item.duration++
            }, 1000)
        ) : clearInterval

        return (
            <div className="todo-items" key={item.id}>
                <FontAwesomeIcon className="icon-star" style={starStyles} icon={faStar} onClick={() => props.favoreIt(item)}/>
                {item.isFinished 
                    ? <FontAwesomeIcon className="icon-done" icon={faSquareCheck} onClick={() => props.deleteIt(item)} />  
                    : <FontAwesomeIcon className="icon-minus" icon={faSquareMinus} onClick={() => props.deleteIt(item)} />}
                <p className="todo-item" style={styles} onClick={() => props.finishIt(item)}>{item.title}</p>
                {item.isOn 
                    ? <Timer 
                        duration={item.duration}
                        durationFunc={duration}
                        /> 
                    : null}
                <FontAwesomeIcon className="icon-play" icon={faCirclePlay} 
                    onClick={() => props.reverseIt(item)}
                    style={playStyles}
                />
            </div>
        )
    })

    const favElements = props.favItems.map(item => {
        return (
            <div key={item.id}>
                <p onClick={() => props.addFromFavToList(item)}>{item.title}</p>
            </div>
        )
    })

    return toDoElements.length > 0 ? (
        <div className="todo-withcontent">
            {toDoElements}
            <div>
                <input value={props.txt} className="input-title" id="title" name="title" type="text" onChange={props.handleChange}/>
                <FontAwesomeIcon className="icon-plus" icon={faPlus} onClick={props.addItem}/>
            </div>
            <h3 onClick={() => {
                    setShowFav(prevValue => !prevValue)
                }}>
                    Add from favorites
                </h3>
            {showFav ? (
                <div className="favList" style={favStyles}>
                <div className="favList-items" style={favItemsStyle}>
                    {favElements}
                </div>
            </div>
            ) : null}
        </div>
    ) : (
        <div className="todo-nocontent">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGxkM3h3bTE2eml2ZHBueGdpNjNod2F5anV1a3k0ZzYxdDI0OHdueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ES4Vcv8zWfIt2/giphy.gif" />
            <div>
                <input value={props.txt} className="input-title" id="title" name="title" type="text" onChange={props.handleChange}/>
                <FontAwesomeIcon className="icon-plus" icon={faPlus} onClick={props.addItem}/>
            </div>
            <h3 onClick={() => {
                    setShowFav(prevValue => !prevValue)
                }}>
                    Add from favorites
                </h3>
            {showFav ? (
                <div className="favList" style={favStyles}>
                <div className="favList-items" style={favItemsStyle}>
                    {favElements}
                </div>
            </div>
            ) : null}
        </div>
    )
}