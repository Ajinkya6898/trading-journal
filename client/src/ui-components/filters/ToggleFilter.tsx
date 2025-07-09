import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Stack,
} from "@mui/material";

type ToggleOption<T> = {
  label: string;
  value: T;
};

type ToggleFilterProps<T> = {
  label: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (val: T) => void;
  exclusive?: boolean;
};

const ToggleFilter = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  exclusive = true,
}: ToggleFilterProps<T>) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: T | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2" fontWeight={500} color="text.secondary">
        {label}
      </Typography>

      <ToggleButtonGroup
        value={value}
        exclusive={exclusive}
        onChange={handleChange}
        size="small"
        color="primary"
      >
        {options.map((opt) => (
          <ToggleButton key={String(opt.value)} value={opt.value}>
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default ToggleFilter;
