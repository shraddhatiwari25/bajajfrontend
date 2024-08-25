
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    
    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(jsonInput);

            const res = await axios.post('http://localhost:3000/bfhl', parsedData);
            setResponse(res.data);

            setError('');
            setFilterOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
        } catch (err) {
            setError('Invalid JSON or API Error');
            setFilterOptions([]);
        }
    };

    const handleFilterChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFilterOptions(selectedOptions);
    };

    const renderResponse = () => {
        if (!response) return null;
        
        let filteredResponse = {};
        if (filterOptions.includes('Alphabets')) {
            filteredResponse.Alphabets = response.alphabets;
        }
        if (filterOptions.includes('Numbers')) {
            filteredResponse.Numbers = response.numbers;
        }
        if (filterOptions.includes('Highest lowercase alphabet')) {
            filteredResponse['Highest lowercase alphabet'] = response.highest_lowercase_alphabet;
        }

        return (
            <div>
                {Object.entries(filteredResponse).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {value.join(', ')}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>21BCE10259</h1>
            <form onSubmit={handleSubmit}>
                <label>API Input:</label>
                <textarea value={jsonInput} onChange={handleInputChange} rows="4" cols="50" />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {response && (
                <>
                    <label>Multi Filter:</label>
                    <select multiple={true} onChange={handleFilterChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <div>
                        <h3>Filtered Response:</h3>
                        {renderResponse()}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
