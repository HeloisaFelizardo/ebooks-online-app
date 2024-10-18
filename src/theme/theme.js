import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Poppins, Arial, sans-serif',
    heading: 'Poltawski Nowy, serif',
    buttons: 'Poppins, Arial, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'none', // exemplo de cor de fundo global
        color: 'gray.600',
      },
    },
  },
});

export default theme;
