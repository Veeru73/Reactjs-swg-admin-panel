import React from 'react'
import { Stack } from 'react-bootstrap'

export const Headings = ({ MainHeading }) => {
    return (
        <>
            <div className='bgWhite mb-3'>
                <Stack className='pt-md-1 px-1' direction='horizontal' gap={2} style={{
                    justifyContent: 'space-between'
                }}>
                    <Stack direction='vertical' gap={0}>
                        <h2 className='mb-0'>{MainHeading}</h2>
                    </Stack>
                </Stack>
            </div>
        </>
    )
}
