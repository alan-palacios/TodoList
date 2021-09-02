import React from 'react';
import './App.css';
import Task from './components/Task';
import  HttpClient  from "./api/http-client";
import Nav from './components/Nav';
import Title from './components/Title';
import Input from './components/Input';
import ButtonIcon from './components/ButtonIcon';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.state = {
      taskDesc: '',
      editedTaskDesc: '',
      editing: -1,
      showOpt: -1,
      tasks: []
    }
  }

  componentDidMount(){
    HttpClient.get(`task`)
      .then((response) => {
        this.setState({tasks:response.data.data})
      })
      .catch((error) =>{
        console.error(error)
      })

      window.addEventListener('keydown', e => {
        if(e.key === "Escape") {
          this.setState({editing:-1, showOpt: -1});
        }
      })
  }

  addTask(e){
    e.preventDefault();
    if(this.state.taskDesc==='') return;
    HttpClient.post(`task`,{description:this.state.taskDesc})
      .then((response) => {
        let tasks = [...this.state.tasks,response.data.data];
        this.setState({tasks, taskDesc:''});
      })
      .catch((error) =>{
        console.error(error)
      })

  }
  removeTask(index){
    HttpClient.delete(`task/${this.state.tasks[index]._id}`,)
      .then((response) => {
        const tasks = this.state.tasks.filter((task, j) => index !== j);
        this.setState({tasks, editing:-1, showOpt:-1});
      })
      .catch((error) =>{
        console.error(error)
      })
  }
  saveTask(index, e){
    e?.preventDefault();
    let updatedTask = {...this.state.tasks[index]};
    updatedTask.description = this.state.editedTaskDesc;
    HttpClient.put(`task/${updatedTask._id}`, updatedTask)
      .then((response) => {
        const tasks = this.state.tasks.map((task, j) =>{
          if (index===j)
            return response.data.data;    
          else
            return task;
        });
        this.setState({tasks, editing:-1, showOpt:-1});
      })
      .catch((error) =>{
        console.error(error)
      })
  }
  checkboxChangeHandler(index){
    let updatedTask = {...this.state.tasks[index]};
    updatedTask.completed = !updatedTask.completed;
    HttpClient.put(`task/${updatedTask._id}`, updatedTask)
      .then((response) => {
        const tasks = this.state.tasks.map((task, j) =>
        {
          if (index===j) {
          return response.data.data;    
          } else {
            return task;
          }
        });
        this.setState({tasks, editing:-1});
      })
      .catch((error) =>{
        console.error(error)
      })
  }
  editTask(index){
    let newIndex=(index===this.state.showOpt)?index:-1;
    this.setState({editing:index,showOpt:newIndex, editedTaskDesc:this.state.tasks[index].description});
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  toggleOptions(index) {
    let newIndex=(index===this.state.showOpt)?-1:index;
    this.setState({editing:-1, showOpt: newIndex});
	}
  renderSingleTask(task, index, type){
    if(type !== task.completed) return "";
    const props = {
      index,
      showOpt:this.state.showOpt,
      editedTaskDesc:this.state.editedTaskDesc,
      desc:task.description,
      completed: task.completed,
      editable: this.state.editing===index,
      removeTask: this.removeTask,
      editTask: this.editTask,
      handleChange: this.handleChange,
      toggleOptions: ()=>this.toggleOptions(index),
      checkboxChangeHandler: ()=>this.checkboxChangeHandler(index),
      saveTask: this.saveTask,
    }
    return <Task key={index} {...props}/>   
  }
  renderTasks(){
    if(this.state.tasks.length>0) return (
      <div className="flex-col md:flex-row md:flex md:space-x-10">
        <div className="mb-5 ">
          <Title title="To do" />
          {
            this.state.tasks.map( (task,index) =>this.renderSingleTask(task,index, false))
          }
        </div>
        <div className="">
          <Title title="Completed" />
          {
            this.state.tasks.map( (task,index) =>this.renderSingleTask(task,index, true))
          }
        </div>
      </div>
      )
  }

  render(){
    return (
      <div className="bg-gray-70 h-full text-purple-900">
        <Nav title="To do List"></Nav>
        <div className="p-10 pt-20 h-full text-purple-900
                        sm:p-20
                        lg:pt-24">
          <Title title="Add Item" />
              <form className="flex space-x-5 pb-10">
                  <Input name="taskDesc" onChange={e=>this.handleChange(e)} value={this.state.taskDesc} label="Task"/>
                  <ButtonIcon type="submit" onClick={e=>this.addTask(e)}  icon="carbon:add" background="bg-purple-500" hover="bg-purple-600"/>
              </form>
            {this.renderTasks()}
            {/*<pre>
              {JSON.stringify(this.state,null,2)}
            </pre>*/}
        </div>

      </div>
    );
  }

}

export default App;
