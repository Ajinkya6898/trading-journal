import React, { useMemo } from "react";
import { Divider, Grid, Typography } from "@mui/material";
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
  alias?: string;
}

const PanelElement = styled.div`
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  margin: 0 0 20px 0;
  width: 100%;
  display: flex;
  flex-flow: row;
`;

const PanelDetails = styled.div`
  width: 100%;
  padding-bottom: 20px;

  & .block {
    margin-bottom: 30px;
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
  const Accordion = useMemo(() => {
    return styled((props: AccordionProps) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(() => ({
      boxShadow: "none",
      "& .Mui-expanded": {
        minHeight: "inherit !important",
      },
      "&.MuiAccordion-root": {
        backgroundColor: "transparent",
      },
    }));
  }, []);

  return (
    <Grid container columns={{ xs: 12 }}>
      <PanelElement>
        <div style={{ flexGrow: 2 }}>
          <Accordion expanded={forceOpen}>
            <PanelHeader elementId={`${elementId}-header`} label={label} />
            <Divider />
            <AccordionDetails sx={{ padding: "20px" }}>
              <PanelDetails>
                {description && (
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", mb: 2 }}
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
