import { Button, Col, Row} from 'react-bootstrap';

function Task(props){
	function renderButtons() {
		return (props.editable)?
			<div>
				<Button onClick={()=>props.removeTask(props.index)}>Remove</Button>
            	<Button onClick={()=>props.saveTask() }>Save</Button>
			</div>
		:
			<div>
				<Button onClick={()=>props.removeTask(props.index)}>Remove</Button>
				<Button onClick={()=>props.editTask(props.index)}>Edit</Button>
			</div>
	}
	function renderLabel() {
		return (props.editable)?
            <input id="editingTask" onChange={(e)=>props.updateTask(props.index, e.target.value)} value={props.desc}/>
		:
			<span>{props.desc}</span>
	}

	return(
		<Row key={props.index} className="p-2">
			<Col >
				{renderButtons()}
			</Col>
			<Col>
				{renderLabel()}
			</Col>
		</Row>
	)
}

export default Task;