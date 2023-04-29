import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';

export default class CreateNote extends Component {

  state={
    users:[],
    userSelected: '',
    date: '',
    editing: false,
    _id: ''
  }

  async componentDidMount(){

    const res = await axios.get('http://localhost:4001/api/users');
    this.setState({users: res.data.map(user => user.username),
                  userSelected:res.data[0].username
                });
    /*if(this.props.match.params.id){
      this.setState({
        editing: true,
        _id: this.props.match.params.id
      })
    }*/
  }


  onSubmit = async (e) => {
    e.preventDefault();
    const newNote ={
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };

    if(this.state.editing){
      await axios.put('http://localhost:4001/api/notes/' + this.state._id, newNote);
    } else {
      await axios.post('http://localhost:4001/api/notes', newNote);
     }

    window.location.href = '/';
  }

  onUserChange = (e) =>{ 
    //console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDateChange = date => {
    this.setState({date})
  }

  

  render() {
    return (
      <div className="col-md-6 offset-md-3">
          <div className="card card-body">
            <h4>Crea una Nota</h4>

              {/* SELECT USER */}
              <div className="from-group">
                <select 
                className='from-control' 
                name='userSelected'
                onChange={this.onUserChange}
                >
                  {
                    this.state.users.map(user => 
                    <option key={user}>
                      {user}
                    </option>)
                  }
                </select>
              </div>

              <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                placeholder='Title' 
                name='title'
                onChange={this.onUserChange}
                required />
              </div>

              <div className="form-group">
                <textarea 
                  name="content"
                  className='form-control'
                  placeholder='Content' 
                  onChange={this.onUserChange}
                  required>
                </textarea>
              </div>

              <div className="form-group container col-md-8 offset-ml-9">
                <DatePicker className='form-control'
                            selected={this.state.date}
                            placeholderText='Date'
                            onChange={this.onDateChange}/>
              </div>

            <form onSubmit={this.onSubmit}>
              <button type="submit" className='btn btn-primary'>
                Save
              </button>
            </form>
          </div>
      </div>
    )
  }
}
