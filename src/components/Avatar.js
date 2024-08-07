import React from 'react'
import { Image, Stack,  } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Avatar = ({LinkLabel, LinkPath, Description}) => {
    return (
        <>

            <Link className='SubMenu' to={LinkPath} style={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '18px'
            }}>
                <Stack direction='horizontal' gap={1}>
                    <div>
                        <Image src="assets/images/avatar.svg" className='Avatar_img' roundedCircle />
                    </div>
                    <Stack direction='vertical' gap={0}>
                        <span>
                            {LinkLabel}
                        </span>
                        <p style={{
                            color: '#64748B',
                            margin: 0
                        }}>
                            {Description}
                        </p>
                    </Stack>
                </Stack>
            </Link>


        </>
    )
}
