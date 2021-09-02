import React from 'react';
import './App.css';
import Task from './components/Task';
import  HttpClient  from "./api/http-client";
import Nav from './components/Nav';
import Title from './components/Title';
import Input from './components/Input';
import ButtonIcon from './components/ButtonIcon';
import { Animate }  from 'react-simple-animate';

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
      error:'',
      editing: -1,
      showOpt: -1,
      tasks: []
    }
  }

  componentDidMount(){
    window.addEventListener('keydown', e => {
        if(e.key === "Escape") {
          this.setState({editing:-1, showOpt: -1});
        }
    })

    HttpClient.get(`task`)
      .then((response) => {
        const res = response.data.data;
        this.setState({tasks:res.tasks})
      })
      .catch((error) =>{
        this.changeErrorMessage(error);
      })


  }

  addTask(e){
    e.preventDefault();
    if(this.state.taskDesc==='') return;
    HttpClient.post(`task`,{description:this.state.taskDesc})
      .then((response) => {
        let tasks = [...this.state.tasks,response.data.data];
        this.setState({tasks, taskDesc:'', error:''});
      })
      .catch((error) =>{
        this.changeErrorMessage(error);
      })

  }
  removeTask(index){
    HttpClient.delete(`task/${this.state.tasks[index]._id}`,)
      .then((response) => {
        const tasks = this.state.tasks.filter((task, j) => index !== j);
        this.setState({tasks, editing:-1, showOpt:-1, error:''});
      })
      .catch((error) =>{
        this.changeErrorMessage(error);
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
        this.setState({tasks, editing:-1, showOpt:-1, error:''});
      })
      .catch((error) =>{
        this.changeErrorMessage(error);
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
        this.setState({tasks, editing:-1, error:''});
      })
      .catch((error) =>{
        this.changeErrorMessage(error);
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
  changeErrorMessage(err){
    let message;
    let code;
    if (err.response) {
      code =err.response.status;
    }else{
      code = err.code
    }
    switch (code) {
      case 500:
        message ="Database Error";
        break;
      case 401:
        message ="Task Not Found";
        break;
      default:
        message ="Cannot connect to server";
        break;
    }
   this.setState({error:message});
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
    return(
        <Task key={index} {...props}/>
    )    
  }
  renderTasks(){
    //update number of uncompleted task only when removing or change the state of the task for more efficiency
    const uncompleted = this.state.tasks.filter(item=>!item.completed).length;
    return (
      <div className="flex-col md:flex-row md:flex md:space-x-10">
        <div className="mb-5 md:w-1/2 ">
          <Title title="To do" />
            {
              (uncompleted>0)?
                this.state.tasks.map( (task,index) =>this.renderSingleTask(task,index, false))
                :
                <span className="text-purple-400">You have finished all your tasks :)</span>
            }
        </div>

        <div className="md:w-1/2">
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
        <Nav title="To do"></Nav>
        <div className="p-10 pt-20 h-full text-purple-900
                        sm:p-20
                        lg:pt-24">
          <Title title="Add Task" />
              <form className="flex space-x-5 pb-10">
                  <Input name="taskDesc" onChange={e=>this.handleChange(e)} value={this.state.taskDesc} label="Task"/>
                  <ButtonIcon type="submit" onClick={e=>this.addTask(e)}  icon="carbon:add" background="bg-purple-500" hover="bg-purple-600"/>
                  <span className="text-red-400">{this.state.error}</span>
              </form>
              <Animate
                play={this.state.tasks} duration={0.5}
                end={{ opacity: 1}}
                start={{ opacity: 0}}>
                {this.renderTasks()}
             </Animate>
        </div>
      </div>
    );
  }

}

export default App;
