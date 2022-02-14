import React, { useState } from "react";
import PrintTodos from "./PrintTodos.jsx";

import "../../styles/TodoList.css";

const TodoList = () => {
	const [listTodo, setListTodo] = useState([]);
	const [listNormalTodo, setListNormalTodo] = useState([]);
	const [listImportantTodo, setListImportantTodo] = useState([]);
	const [listUrgentTodo, setListUrgentTodo] = useState([]);
	const [taskCount, setTaskCount] = useState(0);
	const [typeTodo, setTypeTodo] = useState("normal");
	const [newTodo, setNewTodo] = useState({
		label: "",
		done: false,
		type: typeTodo,
	});

	const withIntroSaveTodo = (e) => {
		if (e.code === "Enter") {
			if (newTodo.type === "normal") {
				const newListTodo = [...listNormalTodo, newTodo];
				const totalTodo = listUrgentTodo
					.concat(listImportantTodo)
					.concat(newListTodo);
				setListTodo(totalTodo);
				setListNormalTodo(newListTodo);
			} else if (newTodo.type === "important") {
				const newListTodo = [...listImportantTodo, newTodo];
				const totalTodo = listUrgentTodo
					.concat(newListTodo)
					.concat(listNormalTodo);
				setListTodo(totalTodo);
				setListImportantTodo(newListTodo);
			} else if (newTodo.type === "urgent") {
				const newListTodo = [...listUrgentTodo, newTodo];
				const totalTodo = newListTodo
					.concat(listImportantTodo)
					.concat(listNormalTodo);
				setListTodo(totalTodo);
				setListUrgentTodo(newListTodo);
			}
			setNewTodo({ label: "" });
		}
	};

	const deleteTodo = (id) => {
		const list = listTodo.filter((todo) => listTodo[id] !== todo);
		if (listTodo[id].type === "normal") {
			const newListTodo = listNormalTodo.filter(
				(todo) => listTodo[id] !== todo
			);
			setListNormalTodo(newListTodo);
		} else if (listTodo[id].type === "important") {
			const newListTodo = listImportantTodo.filter(
				(todo) => listTodo[id] !== todo
			);
			setListImportantTodo(newListTodo);
		} else if (listTodo[id].type === "urgent") {
			const newListTodo = listUrgentTodo.filter(
				(todo) => listTodo[id] !== todo
			);
			setListUrgentTodo(newListTodo);
		}
		setListTodo(list);
	};

	const taskDone = (id) => {
		let count = taskCount;
		const list = listTodo;
		if (listTodo[id].done === true) {
			list[id].done = false;
			count--;
		} else {
			list[id].done = true;
			count++;
		}
		setListTodo(list);
		setTaskCount(count);
	};

	return (
		<div className="gradient-custom vh-100">
			<div className="pt-3 row d-flex justify-content-center align-items-center h-100">
				<div className="col-10 col-xl-10">
					<div className="card">
						<div className="card-body p-5">
							<h1 className="d-flex justify-content-center p-3">
								to do list
							</h1>
							<select
								className="form-select mb-3"
								onChange={(e) => {
									setTypeTodo(e.target.value);
								}}>
								<option value="normal">Normal</option>
								<option value="important">Important</option>
								<option value="urgent">Urgent</option>
							</select>
							<div className="input">
								<input
									className="form-control"
									id="new-todo"
									type="text"
									placeholder="Insert to do"
									onChange={(e) => {
										setNewTodo({
											label: e.target.value,
											done: false,
											type: typeTodo,
										});
									}}
									onKeyPress={withIntroSaveTodo}
									value={newTodo.label}
								/>
							</div>
							{listTodo.map((todo, index) => (
								<PrintTodos
									key={index}
									id={index}
									todo={todo.label}
									done={todo.done}
									type={todo.type}
									deleteTodo={deleteTodo}
									taskDone={taskDone}
								/>
							))}
						</div>
						<div className="m-3 d-flex justify-content-around">
							<div className="badge bg-light text-dark">
								{listTodo.length} to do pendings:
							</div>
							<div className="badge bg-danger">
								{listUrgentTodo.length} urgent tasks{" "}
							</div>
							<div className="badge bg-warning">
								{listImportantTodo.length} important tasks{" "}
							</div>
							<div className="badge bg-info">
								{listNormalTodo.length} normal tasks
							</div>
							<div className="badge bg-secondary">
								{taskCount} tasks done
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
