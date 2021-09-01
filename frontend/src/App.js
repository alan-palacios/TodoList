import React from 'react';
import './App.css';
import Task from './components/Task';
import  HttpClient  from "./api/http-client";
import Nav from './components/Nav';
import Title from './components/Title';
import Input from './components/Input';
import Button from './components/Button';
import ButtonIcon from './components/ButtonIcon';

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
    /*HttpClient.get(``)
      .then((response) => {
        this.setState({data:response.data})
      })
      .catch((error) =>{
        console.error(error)
      })*/
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
          <Title title="Tasks" />
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
      <div className="bg-gray-70 h-full text-gray-800">
        <Nav title="Todo List"></Nav>
        <div className="p-10 pt-20 h-full text-gray-800">
          <Title title="Add Item" />
              <form className="flex space-x-5 pb-10">
                  <Input id="taskDesc" onChange={e=>this.handleChange(e)} value={this.state.taskDesc} label="Task"/>
                  <ButtonIcon type="submit" onClick={e=>this.addTask(e)}  icon="carbon:add" background="bg-green-500"/>
              </form>
            {this.renderTasks()}
            <pre>
              {JSON.stringify(this.state)}
            </pre>
        </div>

      </div>
    );
  }

}

export default App;
