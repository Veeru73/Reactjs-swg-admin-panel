import React from 'react'
import { Container, Image, Stack } from 'react-bootstrap'

export const Error404 = () => {
  return (
    <>
      <Container>
        <div className='404Box'>
          <Stack direction='vertical' gap={3} style={{
            justifyContent: 'center',
            alignItems: 'center',
            height:'100vh'
          }}>
            <Image src='./assets/images/404.png' className='img-fluid w-50' />
          </Stack>
        </div>
      </Container>
    </>
  )
}
