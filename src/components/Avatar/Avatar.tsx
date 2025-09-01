import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

export default function FallbackAvatars() {
  return (
    <Stack direction="row" spacing={2} className='cursor-pointer'>
      <Avatar src="/broken-image.jpg" />
    </Stack>
  );
}