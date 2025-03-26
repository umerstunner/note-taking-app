import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App2.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleInputChange = (event) => {
        setNoteInput(event.target.value);
    };

    const addNote = useCallback(() => {
        if (noteInput.trim() !== '') {
            setNotes((prevNotes) => [...prevNotes, noteInput.trim()]);
            setNoteInput('');
        }
    }, [noteInput]);

    useEffect(() => {
        inputRef.current.focus();
    }, [notes]);

    const noteCount = useMemo(() => notes.length, [notes]);

    return (
        <div>
            <h1>Note-Taking App</h1>
            <input
                ref={inputRef}
                type="text"
                value={noteInput}
                onChange={handleInputChange}
                placeholder="Enter your note here..."
            />
            <button onClick={addNote}>Add Note</button>
            <p>Total Notes: {noteCount}</p>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;