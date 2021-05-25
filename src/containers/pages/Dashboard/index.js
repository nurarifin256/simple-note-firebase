import React, { Component, Fragment } from 'react';
import { addDataToAPI, getDataToAPI, updateDataToAPI, deleteDataToAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';
import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid)
    }

    handleSaveNotes = () => {
        const { title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if (textButton === 'SIMPAN') {
            saveNotes(data);
        } else {
            data.noteId = noteId;
            updateNotes(data);
        }
        console.log(data);
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        // console.log(note);
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation();
        const { deleteNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data);
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    render() {
        const { title, content, date, textButton } = this.state
        const { notes } = this.props;
        const { updateNotes, cancelUpdate, deleteNote } = this;
        console.log('notes ', notes);
        return ( 
            <div className = "container">
                <div className = "input-form" >
                    <input placeholder = "title" type = "text" className = "input-title" value = {title} onChange={(e) => this.onInputChange(e, 'title')}/> 

                    <textarea placeholder = "content" type = "text" className = "input-content" value = { content } onChange = {(e) => this.onInputChange(e, 'content') } >
                    </textarea> 
                    
                    <div className = "action-wrapper" > 
                    {
                        textButton === 'UPDATE' ? ( 
                        <button className = "save-btn cancel" onClick={ cancelUpdate }>Cancel</button>
                        ) : null
                    } 
                    <button className = "save-btn" onClick = { this.handleSaveNotes }>{ textButton }</button> 
                </div> 
            </div> 

            {
            notes.length > 0 ? ( 
                    <Fragment > {
                        notes.map(note => {
                            return ( 
                            <div className = "card-content"
                                onClick = {
                                    () => updateNotes(note) }
                                key = { note.id } >
                                <p className = "title" > { note.data.title } </p> 
                                <p className = "date" > { note.data.date } </p> 
                                <p className = "content" > { note.data.content } </p> 
                                <div className = "delete-btn" onClick={(e) => deleteNote(e, note) } > X 
                                </div> 
                            </div>
                            )
                        })
                    } 
                    </Fragment>
                ) : null
            }

            </div>
        );
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataToAPI(data)),
    updateNotes: (data) => dispatch(updateDataToAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataToAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);