import React, { useMemo } from "react";
import { Divider, Grid, Typography, useTheme, alpha } from "@mui/material";
import {
  Accordion as MuiAccordion,
  AccordionProps,
  AccordionDetails,
} from "@mui/material";
import styled from "@emotion/styled";
import PanelHeader from "./PanelHeader";

export interface PanelProps extends BasePanelProps {
  children?: React.ReactNode;
  forceOpen?: boolean;
}

interface BasePanelProps {
  label: string;
  elementId: string;
  description?: string;
}

const PanelElement = styled.div<{ theme: any }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.palette.background.paper} 0%,
    ${(props) => alpha(props.theme.palette.grey[50], 0.3)} 100%
  );
  border: 1px solid ${(props) => alpha(props.theme.palette.grey[300], 0.2)};
  border-radius: 16px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-flow: row;
  margin-bottom: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px
        ${(props) => alpha(props.theme.palette.primary.main, 0.12)},
      0 0 0 1px ${(props) => alpha(props.theme.palette.primary.main, 0.08)};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.palette.primary.main},
      ${(props) => props.theme.palette.primary.light}
    );
    opacity: 0.6;
  }
`;

const PanelDetails = styled.div`
  width: 100%;
  padding-bottom: 0;

  & .block {
    margin-bottom: 24px;
  }

  & .block:last-child {
    margin-bottom: 0;
  }
`;

export function Panel({
  elementId,
  children,
  label,
  description,
  forceOpen,
}: PanelProps) {
  const theme = useTheme();

  const Accordion = useMemo(() => {
    return styled((props: AccordionProps) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(() => ({
      boxShadow: "none",
      background: "transparent",
      "&.MuiAccordion-root": {
        backgroundColor: "transparent",
        "&::before": {
          display: "none",
        },
      },
      "& .MuiAccordionSummary-root": {
        minHeight: "auto",
        padding: "16px 20px",
        transition: "all 0.2s ease-in-out",
        borderRadius: "16px 16px 0 0",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
        },
        "& .MuiAccordionSummary-content": {
          margin: "0",
          "&.Mui-expanded": {
            margin: "0",
          },
        },
      },
      "& .MuiAccordionDetails-root": {
        padding: "0 20px 20px 20px",
        background: "transparent",
      },
      "& .Mui-expanded": {
        minHeight: "auto !important",
        margin: "0 !important",
      },
    }));
  }, [theme]);

  const StyledDivider = styled(Divider)`
    margin: 0 20px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${alpha(theme.palette.primary.main, 0.1)} 20%,
      ${alpha(theme.palette.primary.main, 0.2)} 50%,
      ${alpha(theme.palette.primary.main, 0.1)} 80%,
      transparent 100%
    );
    height: 1px;
    border: none;
  `;

  return (
    <Grid container columns={{ xs: 12 }}>
      <PanelElement theme={theme}>
        <div style={{ flexGrow: 2, width: "100%" }}>
          <Accordion expanded={forceOpen}>
            <PanelHeader elementId={`${elementId}-header`} label={label} />
            <StyledDivider />
            <AccordionDetails>
              <PanelDetails>
                {description && (
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      mb: 3,
                      color: theme.palette.text.secondary,
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {description}
                  </Typography>
                )}
                {children}
              </PanelDetails>
            </AccordionDetails>
          </Accordion>
        </div>
      </PanelElement>
    </Grid>
  );
}

export default Panel;
