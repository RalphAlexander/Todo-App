import Todo from './Todo';

// Returns a component for each value in the array todos,
// a component Todo is created
//
// @param todos - Array of objects with the name, id, and boolean complete.
// @param toggleTodo - Function that toggles the boolean complete given the id of a todo object.
// @param filterTags - Array of objects with the value, label, and color.
export default function TodoList({ 
    todos,
    toggleTodo,
    filterTags,
 }) {

    return (
        todos.map((todo) => {
            return (
            <>
                <Todo 
                key = {todo.key} 
                todo={todo} 
                toggleTodo = {toggleTodo}
                filterTags = {filterTags}/>
            </>
            )
        })
    )
}
