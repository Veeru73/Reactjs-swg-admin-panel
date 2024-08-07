import React from 'react'
import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const LinkSidebar = ({ LinkLabel, LinkIcon, LinkPath }) => {
    return (
        <>
            <Link className='SubMenu' to={LinkPath}  style={{
                textDecoration: 'none',
                color: '#4D4D4F',
                fontSize: '18px',
                fontWeight:'500'
            }}>
                <Stack direction='horizontal' gap={2}>
                    <div>
                        {LinkIcon}
                    </div>
                    <Stack direction='vertical' gap={0}>
                        <span>
                            {LinkLabel}
                        </span>
                        <p style={{
                            color: '#64748B',
                            margin:0
                        }}>
                        </p>
                    </Stack>
                </Stack>
            </Link>
        </>
    )
}
