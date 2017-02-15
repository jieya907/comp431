//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

    'use strict'

    class ToDoItem extends React.Component {

        constructor(props) {
            super(props)
            this.id = "0"
            this.state = {
                done: false,
                text: props.text
            }

            this.toggleDone = this.toggleDone.bind(this)
        }

        toggleDone () {
            this.setState({done: true, className: "completed"})
        }

        render() {
            if (typeof(this.state.text) !== "string") {
                this.state.text = ""
            }
            if (this.state.done) {
                return(<li id='task${_taskId++}'>
                    <i className="check glyphicon glyphicon-check" onClick={this.toggleDone}></i>
                    <span className="completed" contentEditable={true}> {this.state.text}</span>
                    <i className="destroy glyphicon glyphicon-remove" onClick={() => this.props.remove()}></i>
                    </li>)


            } else {
                return (
                    <li id='task${_taskId++}'>
                    <i className="check glyphicon glyphicon-check" onClick={this.toggleDone}></i>
                    <span contentEditable={true}> {this.state.text}</span>
                    <i className="destroy glyphicon glyphicon-remove" onClick={() => this.props.remove()}></i>
                    </li>

                    /*
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */
                )}}
    }

    class ToDos extends React.Component {

        constructor(props) {
            super(props)
            this.nextId = 2;
            this.state = {
                todoItems: [
                    {id:0, text:"This is an item"},
                    {id:1, text:"Another item" }
                ]
            }
        }

        addTodo() {
            // IMPLEMENT ME!
            const text = this.textInput.value;
            console.log(text)
            this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
            })
        }

        removeTodo(removeId) {
            this.setState({ 
                todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
            })
        }

        render() { return (

            // Hint: <input ... ref={ (node) => this.... = node } />
            <div> 
            <input id="newTODO" type="text" placeholder="To Do" ref={(node) => this.textInput = node}/>
            <button onClick={()=> this.addTodo()}>Add Item </button>
            <span className="submit">
            <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo"> {this.state.todoItems.map((x) => 
                <ToDoItem key={x.id} id={x.id} text={x.text} remove={() => this.removeTodo(x.id) }/>)}</ul>
            </div>
            /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
        )}
    }

    ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
