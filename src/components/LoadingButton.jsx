import { Button } from "@chakra-ui/react";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button size='sm' isLoading={isLoading} {...props}>
      {children}
    </Button>
  );
};

export default LoadingButton;
