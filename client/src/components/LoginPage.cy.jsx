import React from 'react'
import LoginPage from './LoginPage'
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom";

describe('<LoginPage />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
    <Box
        sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      gap: '0.5rem'
    }}>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
        <h1>Log into GeoMapper</h1>
      </div>

      <Box component="form" noValidate>
        <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="User Name"
            autoFocus
        />
        <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <LoadingButton
            type="submit"
            fullWidth
            loadingPosition="center"
            variant="contained"
            style={{ backgroundColor: '#40E0D0' }}
        >
          Login
        </LoadingButton>
        <Divider className="divider">OR</Divider>
          <Button style={{ backgroundColor: '#40E0D0' }} variant="contained">
            Register
          </Button>
      </Box>

    </Box>

    )
    cy.contains('Log into GeoMapper').should('be.visible');
    cy.get('[name="userName"]').should('be.visible');
    cy.get('[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  })
})