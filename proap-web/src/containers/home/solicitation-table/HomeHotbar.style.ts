import styled from '@emotion/styled'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'

export const HomeHotbarLink = styled(Link)`
  text-decoration: none;
`

export const HomeHotbarPaper = styled(Paper)`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
