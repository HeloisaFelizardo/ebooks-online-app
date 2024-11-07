import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Poppins, Arial, sans-serif',
    heading: 'Poltawski Nowy, serif',
    buttons: 'Poppins, Arial, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: 'gray.600',
      },
    }),
  },
});

export default theme;
