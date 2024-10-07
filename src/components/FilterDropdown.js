import React from 'react';
import { Dropdown, Stack, Button } from 'react-bootstrap';
import { IoFilterOutline } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const FilterDropdown = ({ selectedValue, setSelectedValue, pageHandler }) => {
    const filterOptions = {
        OTHER_PO: "Other PO",
        JOB_PO: "Job PO",
        WORK_ORDER_PO: "Work Order PO"
    };

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey); // Update selected value
        pageHandler(1);
    };

    const handleClearFilter = () => {
        setSelectedValue(''); // Clear the selected value
    };

    const isSelected = (value) => selectedValue === value; // Check if the item is selected

    return (
        <Stack direction='horizontal' gap={2} style={{ justifyContent: 'end', alignItems: 'center' }}>
            {selectedValue && (
                <Button
                    variant='light'
                    className='rounded-5'
                    style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}
                    onClick={handleClearFilter} // Clear filter when button is clicked
                >
                    <p className="mb-0" style={{ marginRight: '5px' }}>
                        {filterOptions[selectedValue]} {/* Display user-friendly name */}
                    </p>
                    <IoMdClose /> {/* Close icon */}
                </Button>
            )}

            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle className='rounded-5' variant="light" id="dropdown-basic">
                    <IoFilterOutline className='mx-2' /> Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Object.entries(filterOptions).map(([key, displayValue]) => (
                        <Dropdown.Item
                            eventKey={key} // Use the internal key as eventKey
                            key={key}
                            active={isSelected(key)} // Highlight the selected item
                        >
                            {isSelected(key) && <FaCheckCircle className="me-2" />} {/* Check icon */}
                            {displayValue} {/* Display user-friendly name */}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Stack>
    );
};

export default FilterDropdown;
