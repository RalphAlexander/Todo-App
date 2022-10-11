import TodoList from './TodoList';
import { useRef, useState, useEffect } from 'react';
import {default as UUID} from 'node-uuid';
import Select from 'react-select'
import chroma from 'chroma-js';
import './App.css'

// Stores the keys to the JSON string of the array of objects
// todoList and filterTags
const LOCAL_STORAGE_KEY_TODO_LIST = 'todoList'
const LOCAL_STORAGE_KEY_FILTER_TAGS = 'filterTags'

// Stores the options for the select 
const options = [
	{value: 'Red', label: 'Red', color:'#F14F60'},
	{value: 'Blue', label: 'Blue', color:'#4285F4'},
	{value: 'Green', label: 'Green', color:'#01A95C'},
	{value: 'Orange', label: 'Orange', color:'#FDAA2A'}
]

// Styling for the Select component
const colourStyles = {
	control: (styles, {isFocused}) => (
		{ ...styles, 
			zIndex: 0,
			backgroundColor: '#E4F3FF',
			borderColor: '#bde0fe',
			boxShadow: isFocused ? null : null,
			'&:hover': {
		  		borderColor: '#4285F4'
			}
		 }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: isDisabled
			? undefined
			: isSelected
			? data.color
			: isFocused
			? color.alpha(0.1).css()
			: undefined,
			color: isDisabled
			? '#ccc'
			: isSelected
			? chroma.contrast(color, 'white') > 2
				? 'white'
				: 'black'
			: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',
			':active': {
			...styles[':active'],
			backgroundColor: !isDisabled
				? isSelected
				? data.color
				: color.alpha(0.3).css()
				: undefined,
			},
		};
		},
		multiValue: (styles, { data }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: color.alpha(0.1).css(),
		};
		},
		multiValueLabel: (styles, { data }) => ({
		...styles,
		color: data.color,
		}),
		multiValueRemove: (styles, { data }) => ({
		...styles,
		color: data.color,
		':hover': {
			backgroundColor: data.color,
			color: 'white',
		},
		}),
	};

	// Returns the component that renders the entire app
	function App() {
		// React hooks
		const [todoList, setTodoList] = useState([])
		const [filterTags, setFilterTags] = useState([])
		const todoNameRef = useRef()


		// Returns a component that enables a dropdown when clicked
		function DropdownButton(){	

			// @param tags - sets the state of filterTags equal to
			// the selected tag
			const handleChange = (tags) => {
				setFilterTags(Object.values(tags))
			}
			
			return (
			<>
				<Select 
				styles={colourStyles}
				className='react-select'
				value = {filterTags}
				options={options}
				isMulti={true}
				closeMenuOnSelect={false}
				onChange={handleChange}
				placeholder='Select Tags'/>
			</>
			)  
		}

		// When the website is loaded, the previously stored value of
		// the states, todoList and filterTags is loaded in the state
		useEffect(() => {
			const filterTagsLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FILTER_TAGS))
			if (filterTagsLocalStorage) setFilterTags(filterTagsLocalStorage)
			
			const todoListLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODO_LIST))
			if (todoListLocalStorage) setTodoList(todoListLocalStorage)
		}, [])
		
		// When the value of todoList updates, its state is stored in 
		// the localStorage as a JSON string
		useEffect(() => {
			localStorage.setItem(LOCAL_STORAGE_KEY_TODO_LIST, JSON.stringify(todoList))
		}, [todoList])

		// When the value of filterTags updates, its state is stored in 
		// the localStorage as a JSON string
		useEffect(() => {
			localStorage.setItem(LOCAL_STORAGE_KEY_FILTER_TAGS, JSON.stringify(filterTags))
		}, [filterTags])

		// Updates the state of the todoList with a unique id, name and
		// boolean complete when invoked
		function addTodo(){    
			const todoInput = todoNameRef.current.value
			if (todoInput === '') return
			setTodoList(prevTodoList =>{
				return [...prevTodoList, {id: UUID.v4(), name: todoInput, complete: false}]
			})
				todoNameRef.current.value = null;
		}

		// A function that accepts an id and finds the corresponding
		// todo value in the todoList array
		//
		//@param id - The id of a todo
		function toggleTodo(id){
			const newTodos =[...todoList]
			const todo = newTodos.find(todo=> todo.id === id)
			const todoIndex = newTodos.findIndex(todo=> todo.id === id)
			todo.complete = !todo.complete
			
			newTodos.splice(todoIndex,1)
			setTodoList(newTodos)
		}
	
		return (
			<div className='page-layout'>
				<div className='header'>
					<DropdownButton />
					<input 
						maxLength={45}
						placeholder='Todo...'
						ref = {todoNameRef}
						type='text'
						className='textfield'
						onKeyPress={(e) => {
						if (e.key==='Enter'){
							addTodo()
							}
						}} />
					<button
						className='todo-button'
						onClick={addTodo}>
						Add Todo
					</button>
				</div>
				

				<div className='main-body-grid'>
				<TodoList 
					todos={ todoList } 
					toggleTodo={toggleTodo}  
					filterTags={ filterTags } 
					/>
				</div>
			</div>
	)
	}

	export default App;
	
// chroma.js - JavaScript library for color conversions

// Copyright (c) 2011-2019, Gregor Aisch
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.

// 3. The name Gregor Aisch may not be used to endorse or promote products
//    derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	
// The MIT License (MIT)

// Copyright (c) 2010-2020 Robert Kieffer and other contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// The MIT License (MIT)

// Copyright (c) 2021 Jed Watson

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.