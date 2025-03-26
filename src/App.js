import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App2.css';

function App() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });
    const [note, setNote] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = useCallback(() => {
        if (note.trim() === '') return;
        if (editingIndex !== null) {
            setNotes((prevNotes) =>
                prevNotes.map((n, index) => (index === editingIndex ? note : n))
            );
            setEditingIndex(null);
        } else {
            setNotes((prevNotes) => [...prevNotes, note]);
        }
        setNote('');
        inputRef.current.focus();
    }, [note, editingIndex]);

    const deleteNote = useCallback((index) => {
        setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    }, []);

    const editNote = useCallback((index) => {
        setNote(notes[index]);
        setEditingIndex(index);
        inputRef.current.focus();
    }, [notes]);

    const clearAllNotes = useCallback(() => {
        setNotes([]);
    }, []);

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
                <button onClick={addNote}>
                    {editingIndex !== null ? 'Update Note' : 'Add Note'}
                </button>
            </div>
            <p>Total Notes: {totalNotes}</p>
            <button className="clear-all-btn" onClick={clearAllNotes}>
                Clear All Notes
            </button>
            <ul className="note-list">
                {notes.map((n, index) => (
                    <li key={index}>
                        <span>{n}</span>
                        <div className="note-actions">
                            <button onClick={() => editNote(index)}>Edit</button>
                            <button onClick={() => deleteNote(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
