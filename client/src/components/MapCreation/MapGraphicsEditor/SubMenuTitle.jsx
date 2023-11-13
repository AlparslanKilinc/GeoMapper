import React from 'react';
import { Typography, Divider } from '@mui/material';
export default function SubMenuTitle({ title }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
    </div>
  );
}
