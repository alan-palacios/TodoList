import React from 'react';
import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import './App.css';
import Task from './components/Task';
import  HttpClient  from "./api/http-client";

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.state = {
      taskDesc: '',
      editing: -1,
      tasks: []
    }
  }

  componentDidMount(){
    HttpClient.get(``)
      .then((response) => {
        this.setState({data:response.data})
      })
      .catch((error) =>{
        console.error(error)
      })
  }

  addTask(e){
    e.preventDefault();
    if(this.state.taskDesc==='') return;
    let tasks = this.state.tasks;
    tasks.push(this.state.taskDesc);
    this.setState({"tasks":tasks, taskDesc:''});
  }
  removeTask(index){
    let tasks = this.state.tasks;
    tasks.splice(index,1);
    this.setState({"tasks":tasks, editing:-1});
  }
  editTask(index){
    this.setState({editing:index, editingTask:this.state.tasks[index]});
  }
  updateTask(index, value){
    let tasks = this.state.tasks;
    tasks[index]=value;
    this.setState({"tasks":tasks});
  }
  saveTask(){
    this.setState({editing:-1});
  }
  handleChange(e){
    this.setState({[e.target.id]: e.target.value});
  }

  renderTasks(){
    if(this.state.tasks.length>0) return (
        <div>
          <hr />
          <h3>Tasks</h3>
          {
            this.state.tasks.map( (desc,index) =>{
              const props = {
                index,
                desc:this.state.tasks[index],
                editable: this.state.editing===index,
                removeTask: this.removeTask,
                editTask: this.editTask,
                updateTask: this.updateTask,
                handleChange: this.handleChange,
                saveTask: this.saveTask,
              }
              return <Task key={index} {...props}/>
            })
          }
        </div>
      )
  }

  render(){
    return (
      <Container className="pt-3">
        <Row>
          <Col>
            <h1>Todo List</h1>
            <br />
            <h3>Add Item</h3>
            <Row>
              <Form>
                <Col>
                  <input id="taskDesc" onChange={e=>this.handleChange(e)} value={this.state.taskDesc}/>
                </Col>
                <Col>
                  <Button type="submit" onClick={e=>this.addTask(e)}>Add</Button>
                </Col>
              </Form>

            </Row>
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
