	import { useState, useRef, useEffect } from 'react'
	import { AiOutlineCalendar } from 'react-icons/ai';
	import DatePicker from 'react-datepicker'
	import 'react-datepicker/dist/react-datepicker.css';
	import './App.css'

	// returns a component of the todo window if the boolean 
	// hasMatchingTag is true
	//
	// @param todo - Todo object with the name, id, and boolean complete.
	// @param toggleTodo - Function that toggles the boolean complete given the id of a todo object.
	// @param filterTags - Array of objects with the value, label, and color.
	export default function Todo({
		todo,
		toggleTodo,
		filterTags,
	}) {

		// React Hooks
		const [startDate, setStartDate] = useState(new Date())
		const [todoTag, setTodoTag] = useState('notSelected')
		const [details, setDetails] = useState('')
		const [opened, setOpened] = useState(false)
		const [hasMatchingTag, setHasMatchingTag] = useState(true)
		const detailsRef = useRef()

		// When the value of filterTags or todoTag updates, the value of 
		// isMatching is checked if (1) filterTags is empty or (2) todoTag
		// matches a value in filterTags 
		useEffect(() =>{
			var isMatching = false
			if (filterTags.length === 0) isMatching = true
			filterTags.forEach(element => {
				if (element.value === todoTag || element.value === '') {
					isMatching = true
				}
			}) 
		setHasMatchingTag(isMatching)
		},[todoTag][filterTags])

		// Returns a component using the DatePicker component from './datepicker' 
		function DateSelect() {
			return (
				<div className='date-container'>
					<DatePicker 
					popperClassName='date-picker-popper'
					wrapperClassName='date-picker'
					popperPlacement = 'bottom'
					showPopperArrow = {false}
					customInput={<AiOutlineCalendar /> }
					closeOnScroll
					selected={startDate} 
					onChange={(date) => setStartDate(date)} />
				</div>
			)
		}

		// Returns the matching day in ints (0 = sunday, 6 = saturday) to
		// the day in words
		//
		// @param day - day of the week (0 = sunday, 6 = saturday)
		function getWordDay(day) {
			if (day === 0){
				return 'Sunday'
			}
			if (day === 1){
				return 'Monday'
			}
			if (day === 2){
				return 'Tuesday'
			}
			if (day === 3){
				return 'Wednesday'
			}
			if (day === 4){
				return 'Thursday'
			}
			if (day === 5){
				return 'Friday'
			}
			if (day === 6){
				return 'Saturday'
			}
		}
		// Returns the matching month in ints (0 = jan, 11 = dec) to
		// the month in words
		//
		// @param month - month of the year (0 = jan, 11 = dec)
		function getAbrevMonth(month) {
			if (month === 0){
				return 'Jan'
			}
			if (month === 1){
				return 'Feb'
			}
			if (month === 2){
				return 'Mar'
			}
			if (month === 3){
				return 'Apr'
			}
			if (month === 4){
				return 'May'
			}
			if (month === 5){
				return 'June'
			}
			if (month === 6){
				return 'July'
			}
			if (month === 7){
				return 'Aug'
			}
			if (month === 8){
				return 'Sept'
			}
			if (month === 9){
				return 'Oct'
			}
			if (month === 10){
				return 'Nov'
			}
			if (month === 11){
				return 'Dec'
			}
			
		}

		// invokes the function toggleTodo which accepts an id and returns
		// the opposite boolean of the todo's complete value
		function handleTodoClick(){
			toggleTodo(todo.id)
		}

		// sets the opened state to the opposite of the current state
		function handleClick(){
			setOpened(!opened)
		}

		// Sets the value of the todoTag to a string equal to the label,
		// if no tag is selected, 'notSelected' is returned to the 
		// todoTag instead
		//
		// @param tag - Value returned from the event
		function handleTagClick(tag) {
			const currentTag = tag.currentTarget.id
			setTodoTag(tag.currentTarget.id)
			if (currentTag === todoTag){
				setTodoTag('notSelected')
			}
		}

		// Sets the details state to the value of the input text when invoked
		function addDetails(){
			const fullDetails = detailsRef.current.value
			setDetails(fullDetails)
			detailsRef.current.value = null
		}

		// Returns a component containing a collapsible menu when 
		// the boolean opened is true
		function TodoWindow() {
			return (
				<>
				<div 
					className= {opened ? 'todo-window-grid' : 'todo-window-closed'}>
						<DateSelect />
					<input 
					ref={detailsRef}
					placeholder={details === null ? 'Set detail here' : 'Update details here'}
					maxLength={50}
					className='details'
					onKeyPress={(e) => {
						if (e.key==='Enter'){
							addDetails()
							}
						}}
					type='text' />
					<div className='tags-container'>
						<div className={todoTag==='Red' ? 'selected-circle':'circle'} onClick = {handleTagClick} id='Red' />
						<div className={todoTag==='Blue' ? 'selected-circle':'circle'} onClick = {handleTagClick} id='Blue' />
						<div className={todoTag==='Green' ? 'selected-circle':'circle'} onClick = {handleTagClick} id='Green' />
						<div className={todoTag==='Orange' ? 'selected-circle':'circle'} onClick = {handleTagClick} id='Orange' />
					</div>
					<div className='details-text'>
						{details}
					</div>
				</div>
			</>
			)
		}

		// Returns a component containing a window of the todo's details,
		// onclick, the window extends or collapses depending on the
		// boolean todo and reveals more info
		function TodoComponent(){

			return (
				<div className='todo-full-grid'>
				<div 
				className={opened ? 'todo-element-full':'todo-element'}
				onClick={handleClick}> 
					<input
						className='checkbox-button' 
						type='checkbox'
						checked={todo.complete}
						onChange= {handleTodoClick} />
							<div className='todo-text'>
								{todo.name} 
							</div>
					<div className='date-format'>
						{getWordDay(startDate.getDay())}, {startDate.getDate()} {getAbrevMonth(startDate.getMonth())}, {startDate.getFullYear()}
					</div>
				</div>
				<TodoWindow />
			</div>
		)}

		return (
			<>
				{hasMatchingTag && <TodoComponent />}
			</>
		)
	}



// The MIT License (MIT)

// Copyright (c) 2014-2021 HackerOne Inc and individual contributors

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

// Copyright (c) 2018-present Ant UED, https://xtech.antfin.com/

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Copyright 2018 kamijin_fanta <kamijin@live.jp>

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.