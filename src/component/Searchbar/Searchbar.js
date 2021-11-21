import { useState } from "react";
import PropTypes from 'prop-types';
import './Searchbar.css';

export default function Searchbar({onSubmit}) {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value.toLowerCase())
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if (value.trim() === '') {
            return;
        }
        
        onSubmit(value)
        setValue('')
    }

    return (
        <header className="searchbar">
            <form onSubmit={handleSubmit} className="form">
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>
                
                <input
                    className="input"
                    type="text"
                    name="value"
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}