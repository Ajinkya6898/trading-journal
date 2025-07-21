import { styled } from "@mui/material";

export interface BackgroundContainerProps {
  children: any;
  id?: string;
  margin?: string;
  padding?: string;
  direction?: string;
  extraStyles?: any;
}

const BackgroundContainerStyled = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  backgroundColor: `${theme.palette.primary.contrastText}`,
}));

export function BackgroundContainer({
  children,
  margin = "",
  padding = "20px",
  extraStyles,
  id = "",
}: BackgroundContainerProps) {
  return (
    <BackgroundContainerStyled
      id={id}
      sx={{ padding: padding, margin: margin }}
      style={{ ...extraStyles }}
    >
      {children}
    </BackgroundContainerStyled>
  );
}

export default BackgroundContainer;
