import React from "react"
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons"
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ToDoList(props){

    const toDoElements = props.items.map(item => {
        
        const styles = {
            textDecorationLine: item.isFinished ? "line-through" : "none"
        }

        const starStyles  = {
            color: item.isFavorite ? "gold" : "grey"
        }

        return (
            <div className="todo-items" key={item.id}>
                <p className="todo-item" style={styles} onClick={() => props.reverseIt(item)}>{item.title}</p>
                <FontAwesomeIcon className="icon-minus" icon={faSquareMinus} onClick={() => props.deleteIt(item)} />
                <FontAwesomeIcon className="icon-star" style={starStyles} icon={faStar} onClick={() => props.favoreIt(item)}/>
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
        </div>
    ) : (
        <div className="todo-nocontent">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGxkM3h3bTE2eml2ZHBueGdpNjNod2F5anV1a3k0ZzYxdDI0OHdueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ES4Vcv8zWfIt2/giphy.gif" />
            <div>
                <input value={props.txt} className="input-title" id="title" name="title" type="text" onChange={props.handleChange}/>
                <FontAwesomeIcon className="icon-plus" icon={faPlus} onClick={props.addItem}/>
            </div>
        </div>
    )
}