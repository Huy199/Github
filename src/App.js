import React, {Component} from 'react';
import './App.css';
import TaskForm from'./components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {findIndex, filter} from 'lodash';
import { connect } from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        taskEditing : null,
        filter : {
            name : '',
            status : -1
        },
        keyword : '',
        itemEditing : null,
        sortBy : 'name',
        sortValue : 1
      };
    }
   
    onToggleForm = () => { 
        // if(this.state.isDisplayForm && this.state.taskEditing !== null){
        //     this.setState({
        //         isDisplayForm : true,
        //         taskEditing : null
        //     });
        // }else{
        //     this.setState({
        //         isDisplayForm : !this.state.isDisplayForm,
        //         taskEditing : null
        //     });
        // }  
        this.props.onToggleForm();   
    }
    // onCloseForm = () => {
    //     this.setState({
    //         isDisplayForm : false
    //     })
    // }
    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }
    // onSubmit = (data) => {
    //     var {tasks} = this.state;
    //     if(data.id ===''){
    //         data.id = this.generateID();
    //         tasks.push(data);
    //     }else{
    //         var index = this.findIndex(data.id);
    //         tasks[index] = data;
    //     }
        
    //     this.setState({
    //         tasks : tasks,
    //         taskEditing : null
    //     });
    //     localStorage.setItem('tasks',JSON.stringify(tasks));

    // }
    // onUpdateStatus = (id) => {
    //     var {tasks} = this.state;
    //     // var index = this.findIndex(id);
    //     var index = findIndex(tasks, (task) => {
    //         return task.id === id;
    //     });
    //     if(index !== -1){
    //         tasks[index].status = !tasks[index].status;
    //         this.setState({
    //             tasks : tasks
    //         });
    //         localStorage.setItem('tasks',JSON.stringify(tasks));
    //     }

    // }
    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task,index) => {
            if(task.id === id){
                
                result = index;
            }
        });
        return result;
    }
    // onDelete = (id) => {
    //     var {tasks} = this.state;
    //     var index = this.findIndex(id);
    //     if(index !== -1){
    //         tasks.splice(index, 1);
    //         this.setState({
    //             tasks : tasks
    //         });
    //         localStorage.setItem('tasks',JSON.stringify(tasks));
    //     }
    //     this.onCloseForm();
    // }
    onUpdate = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
       
    }
    onSearch = (keyword) =>{
        this.setState({
            keyword : keyword
        });
    } 
    onSort = (sortBy, sortValue) => {      
        this.setState({
                sortBy : sortBy,
                sortValue : sortValue

        })
    }
    render() {
        var {
            
             taskEditing,
             filter,
             // keyword,
             sortBy,
             sortValue
             } = this.state; // var tasks = this.state.tasks
        var {isDisplayForm} = this.props;
        // if(filter){
            // if(filter.name){
            //    tasks = tasks.filter((task) => {
            //         return task.name.toLowerCase().indexOf(filter.name) !== -1;
            //     });


              
            // }
            //     tasks = tasks.filter((task) => {
            //         if(filter.status === -1){
            //             return task;
            //         }else{
            //             return task.status ===(filter.status === 1 ? true : false)
            //         }
            //     });
            
        // }
        // if(keyword){
           // tasks = tasks.filter((task) => {
           //          return task.name.toLowerCase().indexOf(keyword) !== -1;
           //      });

        //     tasks = filter(tasks, (task) => {
        //             return task.name.toLowerCase().indexOf(keyword.toLowerCase())
        //                     !== -1;
        //        });
        // }
        // if(sortBy === 'name'){
        //     tasks.sort((a,b) => {
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name < b.name) return sortValue;
        //         else return 0;
        //     });
        // }else{
        //     tasks.sort((a,b) => {
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status < b.status) return sortValue;
        //         else return 0;
        //     });

        // }
        
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row mt-15">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
                                    :''}>
                        {/*Form*/}
                        {<TaskForm task = {taskEditing} /> }

                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                                    :'col-xs-12 col-sm-12 col-md-12 col-lg-12'
                    }>
                        <button type="button"
                                className="btn btn-primary"
                                 onClick={ this.onToggleForm}
                        >

                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        
                        {/*Search - Sort*/}
                        <Control 
                            onSearch={this.onSearch}
                            onSort = {this.onSort}
                            sortBy = {sortBy}
                            sortValue = {sortValue}
                        />
                        {/*List*/}
                        <TaskList
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isDisplayForm : state.isDisplayForm
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm());
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
