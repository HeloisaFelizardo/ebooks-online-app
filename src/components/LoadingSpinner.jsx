import {Spinner, Flex, Text} from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Flex flexDirection='column' justify="center" align="center" height='50vh'>
    <Spinner
      color='teal'
      size="lg"
      mb={4}
      css={{"--spinner-track-color": "colors.gray.200"}}
    />
    <Text color="teal">Loading...</Text>
  </Flex>
);

export default LoadingSpinner;
