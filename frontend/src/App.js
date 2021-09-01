import React from 'react';
import { Button, Col, Container, Row} from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.state = {
      taskDesc: '',
      editing: -1,
      tasks: []
    }
  }
  addTask(){
    let tasks = this.state.tasks;
    tasks.push(this.state.taskDesc);
    this.setState({"tasks":tasks});
  }
  removeTask(index){
    let tasks = this.state.tasks;
    tasks.splice(index,1);
    this.setState({"tasks":tasks});
  }
  editTask(index){
    this.setState({editing:index, editingTask:this.state.tasks[index]});
  }
  updateTask(index, value){
    let tasks = this.state.tasks;
    tasks[index]=value;
    this.setState({"tasks":tasks});
  }

  renderTasks(){
    return this.state.tasks.map( (task,index) =>
      {
        if(this.state.editing===index){
          return(
            <div key={index}>
                <div>
                  <input id="editingTask" onChange={(e)=>this.updateTask(index, e.target.value)} value={this.state.tasks[index]}/>
                  <Button onClick={()=>this.setState({editing:-1}) }>Save</Button>
                </div>
            </div>)
        }else{
          return(
            <div key={index}>
                <div>
                  <span>{task}</span>
                  <Button onClick={()=>this.removeTask(index)}>Remove</Button>
                  <Button onClick={()=>this.editTask(index)}>Edit</Button>
                </div>
            </div>)
        }
      });
  }
  handleChange(e){
    this.setState({[e.target.id]: e.target.value});
  }

  render(){
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1>Todo List</h1>
            <h3>Add Item</h3>
            <div>
              <input id="taskDesc" onChange={e=>this.handleChange(e)} value={this.state.taskDesc}/>
              <Button onClick={this.addTask}>Add</Button>
            </div>
            <h3>Tasks</h3>
            {this.renderTasks()}
            <pre>
              {JSON.stringify(this.state)}
            </pre>
          </Col>
        </Row>

      </Container>
    );
  }

}

export default App;
