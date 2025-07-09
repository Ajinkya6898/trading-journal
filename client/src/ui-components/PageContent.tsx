import { Box, BoxProps } from "@mui/material";

type PageContentProps = BoxProps;

const PageContent = ({ children, ...rest }: PageContentProps) => {
  return (
    <Box px={4} py={2} display="flex" flexDirection="column" gap={2} {...rest}>
      {children}
    </Box>
  );
};

export default PageContent;
