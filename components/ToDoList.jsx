import React from "react"

export default function ToDoList(props){

    const toDoElements = props.items.map(item => {
        
        const styles = {
            textDecorationLine: item.isFinished ? "line-through" : "none"
        }

        console.log(styles.textDecorationLine)

        return (
            <div className="todo-item" key={item.id}>
                <p style={styles} onClick={() => props.reverseIt(item)}>{item.title}</p>
            </div>
        )
    })

    return (
        <div>
            {toDoElements}
            <div>
                <input value={props.txt} id="title" name="title" type="text" onChange={props.handleChange}/>
                <button className="lmust" onClick={props.addItem}>ADD</button>
            </div>
        </div>
    )
}