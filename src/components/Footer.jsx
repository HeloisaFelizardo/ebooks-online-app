import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="#0B0606" p={4} mt={0} textAlign="center">
      <Text color="#C0C0C0" fontFamily='Poltawski Nowy'>&copy; {new Date().getFullYear()} Ebooks Online. Todos os direitos reservados.</Text>
    </Box>
  );
};

export default Footer;
