import { useState } from "react";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import Checkbox from "./Checkbox";
import Input from "./Input";

function Task(props){
	let [showOpt, setShowOpt] = useState(false);
	function renderButtons() {
		return (props.editable)?
			<div className="flex space-x-2">
				<ButtonIcon onClick={()=>props.removeTask(props.index)} icon="carbon:delete" textColor="text-red-500"/>
				<ButtonIcon onClick={()=>props.saveTask()} icon="carbon:save" textColor="text-green-500"/>
			</div>
		:
			<div className="flex space-x-2">
				<ButtonIcon onClick={()=>props.removeTask(props.index)} icon="carbon:delete" textColor="text-red-500"/>
				<ButtonIcon onClick={()=>props.editTask(props.index)} icon="carbon:edit" textColor="text-blue-500"/>
			</div>
	}
	function renderLabel() {
		return (props.editable)?
		<div className="w-full flex overflow-hidden">
        	<Input id="taskDesc" onChange={e=>props.updateTask(props.index, e.target.value)} value={props.desc} />
		</div>
		:
		<div className="w-full flex overflow-hidden">
			<span className="m-auto ml-0">
				{props.desc}
			</span>
		</div>
	}

	function toggleOptions() {
		setShowOpt(!showOpt);	
	}
	return(
    	<div className={`mt-2 ${props.size} relative p-2 flex space-x-2 w-full rounded-lg border-2 border-gray-200`} key={props.index}>
			<Checkbox />
			{renderLabel()}
			<ButtonIcon icon="carbon:overflow-menu-vertical" background="" textColor="text-gray-500" onClick={()=>toggleOptions()}/>
			<div className={` ${showOpt?'block':'hidden'} absolute -right-3 -top-8 rounded-lg border-2 border-gray-200 bg-gray-100`}>
				{renderButtons()}
			</div>
    	</div>
	)
}

export default Task;