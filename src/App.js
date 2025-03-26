import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App2.css';

function App() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });
    const [note, setNote] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = useCallback(() => {
        if (note.trim() === '') return;
        setNotes((prevNotes) => [...prevNotes, note]);
        setNote('');
        inputRef.current.focus();
    }, [note]);

    const totalNotes = useMemo(() => notes.length, [notes]);

    return (
        <div className="note-app">
            <h1>Note-Taking App</h1>
            <div className="note-input">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your note here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <p>Total Notes: {totalNotes}</p>
            <ul className="note-list">
                {notes.map((n, index) => (
                    <li key={index}>{n}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
