import ButtonIcon from "./ButtonIcon";
import Checkbox from "./Checkbox";
import Input from "./Input";

function Task(props){
	function renderButtons() {
		return (props.editable)?
			<div className="flex space-x-2">
				<ButtonIcon onClick={()=>props.removeTask(props.index)} icon="carbon:delete" textColor="text-red-500"/>
				<ButtonIcon onClick={e=>props.saveTask(props.index, e)} icon="carbon:save" textColor="text-green-500"/>
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
			<form onSubmit={e=>props.saveTask(props.index, e)}>
        		<Input name="editedTaskDesc" onChange={e=>props.handleChange(e)} value={props.editedTaskDesc} />
			</form>
		</div>
		:
		<div className="w-full flex overflow-hidden hover:cursor-pointer" onClick={()=>props.editTask(props.index)}>
			<span className="m-auto ml-2">
				{props.desc}
			</span>
		</div>
	}

	
	return(
    	<div className={`mt-2 ${props.size} relative p-2 flex space-x-2 w-full rounded-lg border-2 border-gray-200`} key={props.index}>
			<Checkbox value={props.completed} checkboxChangeHandler={props.checkboxChangeHandler}/>
			{renderLabel()}
			<ButtonIcon icon="carbon:overflow-menu-vertical" background="" textColor="text-gray-500" onClick={props.toggleOptions}/>
			<div className={` ${props.showOpt===props.index?'block':'hidden'} absolute -right-3 -top-8 rounded-lg border-2 border-gray-200 bg-gray-100`}>
				{renderButtons()}
			</div>
    	</div>
	)
}

export default Task;