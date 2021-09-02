import ButtonIcon from "./ButtonIcon";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { Animate }  from 'react-simple-animate';
import { useState } from "react";

function Task(props){
	let [disappear, setDisappear] = useState(false);
	function renderButtons() {
		return (props.editable)?
			<div className="flex space-x-1">
				<ButtonIcon onClick={()=>props.removeTask(props.index)} icon="carbon:delete" textColor="text-red-500"/>
				<ButtonIcon onClick={e=>props.saveTask(props.index, e)} icon="carbon:save" textColor="text-green-500"/>
			</div>
		:
			<div className="flex space-x-1">
				<ButtonIcon onClick={()=>props.removeTask(props.index)} icon="carbon:delete" textColor="text-red-500"/>
				<ButtonIcon onClick={()=>props.editTask(props.index)} icon="carbon:edit" textColor="text-blue-500"/>
			</div>
	}
	function renderLabel() {
		return (props.editable)?
		<div className="w-full flex overflow-hidden p-1">
			<form onSubmit={e=>props.saveTask(props.index, e)} className="w-full">
        		<Input name="editedTaskDesc" onChange={e=>props.handleChange(e)} value={props.editedTaskDesc} />
			</form>
		</div>
		:
		<div className="w-full flex overflow-hidden hover:cursor-pointer min-h-8 m-1" onClick={()=>props.editTask(props.index)}>
			<span className="m-auto ml-2">
				{props.desc}
			</span>
		</div>
	}

	
	return(
    	<Animate
            play={disappear} duration={0.3}
			onComplete={props.checkboxChangeHandler}
            end={{ opacity: 0, transform: 'translate(0,-2rem) scale(1)'}}
            start={{ opacity: 1,transform: 'translate(0,0)'}}>
			<div className={`mt-2 ${props.size} relative p-2 flex space-x-2 w-full rounded-lg border-2 ${props.completed?'border-purple-500':'border-purple-200'}`} key={props.index}>
				<Checkbox value={props.completed!=disappear} checkboxChangeHandler={()=>setDisappear(!disappear)}/>
				{renderLabel()}
				<ButtonIcon icon="carbon:overflow-menu-vertical" background="" textColor="text-purple-700" onClick={props.toggleOptions}/>
				<Animate
				play={props.showOpt===props.index} duration={0.1}
				end={{ opacity: 1}}
				start={{ opacity: 0}}>
					<div className={` ${props.showOpt===props.index?'block':'hidden'} absolute -right-3 -top-8 rounded-lg border-2 border-gray-200 bg-gray-100 p-1`}>
						{renderButtons()}
					</div>
				</Animate>

			</div>
    	</Animate>
	)
}

export default Task;