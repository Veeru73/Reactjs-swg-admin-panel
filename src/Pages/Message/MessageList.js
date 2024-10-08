import React, { useState } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Checkbox } from '../../components/Checkbox';
import { Textareanew } from '../../components/Textareanew';
import { SharedButton } from '../../components/Button';

export const MessageList = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        { id: 1, name: 'Jenny Wilson', email: 'jennywilson@gmail.com' },
        { id: 2, name: 'John Doe', email: 'johndoe@gmail.com' },
        { id: 3, name: 'Anna Smith', email: 'annasmith@gmail.com' },
        { id: 4, name: 'Peter Parker', email: 'peterparker@gmail.com' },
        { id: 5, name: 'Bruce Wayne', email: 'brucewayne@gmail.com' },
        { id: 6, name: 'Clark Kent', email: 'clarkkent@gmail.com' }
        // Add more users here
    ];

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelectedUsers => 
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter(id => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container>
                <Row>
                    <Col md={12} className='mb-3'>
                        <Stack direction='horizontal' gap={2} style={{ justifyContent: 'end' }}>
                            <Checkbox 
                                Checklabel={"Select All"} 
                                checked={selectAll} 
                                onChange={handleSelectAll} 
                            />
                        </Stack>
                        <div style={{
                            maxHeight: '50vh', 
                            overflowY: 'auto', 
                            border: '1px solid #ddd', 
                            padding: '10px', 
                            marginBottom: '20px'
                        }}>
                            {users.map(user => (
                                <div key={user.id} className='bgWhite my-2'>
                                    <Stack direction='horizontal' gap={2}>
                                        <Stack direction='vertical' gap={0} style={{ justifyContent: 'start' }}>
                                            <h6>{user.name}</h6>
                                            <h6>{user.email}</h6>
                                        </Stack>
                                        <Stack direction='horizontal' gap={2}>
                                            <Checkbox 
                                                ID={user.id} 
                                                name={user.name} 
                                                checked={selectedUsers.includes(user.id)} 
                                                onChange={() => handleCheckboxChange(user.id)} 
                                            />
                                        </Stack>
                                    </Stack>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #ddd' }}>
                            <Textareanew FormPlaceHolder={'write a message'} />
                            <SharedButton BtnLabel={'Send'} BtnVariant={'primary'} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
