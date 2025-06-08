import React from "react";
import { FormHelperText, FormLabel, Grid } from "@mui/material";

export interface FieldLayoutProps {
  label?: string;
  children?: React.ReactNode;
  helperText?: string;
  labelSize?: number;
  inputSize?: number;
  htmlFor?: string;
  alignTop?: boolean;
  validationColor?: string;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({
  label,
  children,
  helperText,
  labelSize = 2,
  inputSize = 4,
  htmlFor,
  alignTop = false,
  validationColor = "gray.dark",
}) => {
  return (
    <>
      <Grid
        container
        spacing={4}
        alignItems={alignTop ? "flex-start" : "center"}
      >
        {
          <Grid size={labelSize} style={{ textAlign: "right" }}>
            <FormLabel
              htmlFor={htmlFor || undefined}
              sx={{ color: validationColor }}
              error={!!helperText}
            >
              {label}
            </FormLabel>
          </Grid>
        }
        <Grid size={inputSize}>{children}</Grid>
      </Grid>
      {helperText && (
        <Grid container spacing={6} mt={-2}>
          <Grid size={labelSize} />
          <Grid size={inputSize}>
            <FormHelperText error>{helperText}</FormHelperText>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FieldLayout;
