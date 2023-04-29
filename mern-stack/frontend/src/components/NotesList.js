import React, { Component, forwardRef } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default class NotesList extends Component {

  state = {
    notes: [],
  }
  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    const res = await axios.delete('http://localhost:4001/api/notes/' + id);
    this.getNotes();
  }

  async getNotes() {
    const res = await axios.get('http://localhost:4001/api/notes')
    this.setState({ notes: res.data })
  }


  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className="col-md-4 p-2" key={note._id}>
              <div className="card">
                <div className="card-header">
                  <div className="card-header d-flex justify-content-between">
                    <h5>{note.title}</h5>
                    <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                      Edit
                    </Link>

                  </div>
                </div>
                <div className="card-body">
                  <p>{note.content}</p>
                  <p>{note.author}</p>
                  <p>{format(note.date)}</p>
                </div>
                <div className="card-footer">
                  <button className='btn btn=danger' onClick={() =>{if(window.confirm('Are you sure you want to delete this note?')) this.deleteNote(note._id)}}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    )
  }
}
