import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Dropdown, FormControl } from 'react-bootstrap';

export const SelectDropdown = ({ FormLabel, placeholder, onChange, options, name, error }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        // Update filteredOptions when options or name change
        if (options && options.length > 0) {
            const newArray = options.map(option => ({
                ...option,
                name: name,
                label: option.label,
                value: option.value
            }));
            setFilteredOptions(newArray);
        } else {
            setFilteredOptions([]);
        }
    }, [options, name]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === '') {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option.label.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    const handleSelect = (option) => {
        onChange(option);
        setSelectedOption(option.label);
        setSearchTerm(''); // Clear search term after selection
    };

    return (
        <>
            <div className="timezone-dropdown">
                <Form.Label>{FormLabel}</Form.Label>
                <InputGroup className='w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" className='w-100'>
                            {selectedOption || 'Select'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='w-100'>
                            <FormControl
                                placeholder={placeholder || 'Search'}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {filteredOptions.map(option => (
                                <Dropdown.Item key={option.value} onClick={() => handleSelect(option)}>
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                        {error && <small className='error'>{error}</small>}
                    </Dropdown>
                </InputGroup>
            </div>
        </>
    )
}
