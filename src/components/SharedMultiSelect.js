import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useEffect } from "react";



export const SharedMultiSelect = ({ labelText, options, name, setSkillsdata, id, value, error }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        setSkillsdata(selectedOptions);
    }, [selectedOptions]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions([...options]);
        }
    };

    useEffect(() => {
        if (value !== undefined) {
            const setop = [];
            const data = value.split(',');
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < options.length; j++) {
                    if (data[i] == options[j].id) {
                        setop.push({
                            id: options[j].id, label: options[j].label
                        })
                    }
                }
            }
            setSelectedOptions(setop);
        }
    }, [value]);


    const handleClearAll = () => {
        setSelectedOptions([]);
    };

    const handleOptionToggle = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const renderMenu = (results, menuProps) => (
        <div className="MultiSelected" {...menuProps}>
            <div>
                <input
                    type="checkbox"
                    checked={selectedOptions.length === options.length}
                    onChange={handleSelectAll}
                    style={{
                        marginRight: '5px'
                    }}
                />
                <span>Select All</span>
                <hr className="mt-1 mb-0" />
            </div>
            <div className="MultiSelectedDrop">
                {results.map((result, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(result)}
                            onChange={() => handleOptionToggle(result)}
                            style={{
                                marginRight: '5px'
                            }}
                        />
                        <span>{result.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <label className="form-label inputLable">{labelText}</label>

            <Typeahead
                id="my-typeahead-id"
                multiple
                name={name}
                options={options}
                selected={selectedOptions}
                onChange={handleChange}
                placeholder="Select options"
                labelKey="label"
                dropdownProps={{
                    style: { maxHeight: "200px", overflow: "auto" },
                }}
                renderMenu={renderMenu}
            />

            {selectedOptions.length > 0 && (
                <button className="btn btn-sm btn-link mt-2 cossBTN" onClick={handleClearAll}>
                    X
                </button>
            )}

        </>
    );
};