import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';

export const NewCheckBoxButton = ({ option = [], BtnSize, BtnVariant, BtnClass, setModuleList }) => {
    const handleClick = (e) => {
        const id = e.id;
        const pre = [...option];
        const index = pre.findIndex((item) => item.id === id);
        pre[index]['ischek'] = !pre[index]['ischek'];
        setModuleList(pre);
    };

    return (
        <>
            {option && option.map((e, i) => (
                <Col md={3} key={i}>
                    <Button
                        onClick={() => handleClick(e)}
                        className={`${BtnClass} ${e.ischek ? 'checked mb-2' : 'mb-2'}`}
                        type={'button'}
                        variant={BtnVariant}
                        size={BtnSize}
                        style={{
                            backgroundColor: e.ischek ? '#0d6efd' : '',
                            color: e.ischek ? '#fff' : '',

                        }}
                    >
                        {e.name}
                    </Button>
                </Col>
            ))}
        </>
    )
}
