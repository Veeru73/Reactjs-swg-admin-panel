import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';



export const Timeformatdropdown = ({ FormLabel, placeholder,onChange,arraydata,name,error ,value}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [maindata,setMaindata] = useState([])

    useEffect(() => {
        let newArray = [];
        if(arraydata && arraydata.length > 0) {           
          newArray = arraydata.map((e)=>({'name':name,'label':e.label,'value':e.value}))  

        }
        setFilteredOptions(newArray);
        setMaindata(newArray);
    }, [arraydata,name]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term === '') {
            setFilteredOptions(maindata);
        } else {
            const filtered = maindata.filter(option =>
                option.label.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    };

    useEffect(()=>{
        if(value){
         const e = maindata.find((pre)=>pre.value===value);
         if(e){
            const fdata ={'name':name,'label':e.label,'value':e.value};
            onChange(fdata);
            setSelectedOption(fdata.label);
         }
        }
    },[maindata,value])

    const handleSelect = (data) => {
        onChange(data);
        setSelectedOption(data.label);
    };

    return (
        <>
            <div className="timezone-dropdown">
                <Form.Label>{FormLabel}</Form.Label>
                <InputGroup className='w-100'>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" className='w-100'>
                            {selectedOption || 'select'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <FormControl
                                placeholder='Select'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            {filteredOptions.map(e => (
                                <Dropdown.Item key={e.value} onClick={() => handleSelect(e)}>
                                    {e.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                        <small className='error'>{error}</small>
                    </Dropdown>
                </InputGroup>
            </div>
        </>
    )
}
