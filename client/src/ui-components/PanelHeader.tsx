import styled from "@emotion/styled";
import { Typography, useTheme } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import Icon from "./Icon";

export interface PanelHeaderProps {
  elementId: string;
  label: string;
  expanded?: boolean;
}

const PanelHeaderContainer = styled.div`
  padding: 20px 0;
  width: 100%;
`;

export function PanelHeader(props: PanelHeaderProps) {
  const {
    palette: { error, primary },
  } = useTheme();

  const hasError = false;

  const accordionSummaryStyle = {
    borderRadius: "10px",
    padding: "0 20px",
    "&:hover": {
      backgroundColor: hasError ? "error.lighter" : "primary.lightest",
    },
    "& .MuiAccordionSummary-content": {
      margin: "0  !important",
    },
    "&.Mui-focusVisible": {
      backgroundColor: hasError ? "error.lighter" : "primary.lightest",
    },
  };
  return (
    <AccordionSummary
      id={`${props.elementId}-accordion-summary`}
      sx={{
        ...accordionSummaryStyle,
      }}
      expandIcon={
        <Icon
          id="angleDown"
          variant="large"
          type="angle-down"
          error={hasError}
          style={{ color: hasError ? error.main : primary.dark }}
        />
      }
    >
      <PanelHeaderContainer id={props.elementId}>
        <Typography
          variant={"h6"}
          sx={{ color: hasError ? "error.main" : "primary.dark" }}
        >
          {props.label}
        </Typography>
      </PanelHeaderContainer>
    </AccordionSummary>
  );
}

export default PanelHeader;
