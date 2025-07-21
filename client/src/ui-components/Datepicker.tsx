import { DatePicker as MUIDatepicker } from "@mui/x-date-pickers";
import Icon from "./Icon";
import FieldLayout from "./FieldLayout";

export interface DatePickerProps {
  value?: any;
  disabled?: boolean;
  dateLabel?: string;
  helperText?: string;
  label?: string;
  labelSize?: number;
  inputSize?: number;
  onChange: (value: any) => void;
  disableFutureDate?: boolean;
  elementId?: string;
  variant?: "regular" | "small";
  error?: string;
  fullWidth?: boolean;
  noLayout?: boolean;
}

function DatePickerIcon() {
  return <Icon id="angle-left" type="angle-down" variant="medium" />;
}

function RightArrowIcon() {
  return <Icon id="angle-right" type="angle-right" variant="medium" />;
}

function LeftArrowIcon() {
  return <Icon id="angle-left" type="angle-left" variant="medium" />;
}

export function DatePicker({
  value,
  disabled = false,
  disableFutureDate = true,
  variant = "regular",
  helperText,
  label,
  labelSize,
  inputSize,
  error,
  fullWidth = false,
  noLayout = false,
  ...props
}: DatePickerProps) {
  const textFieldProps = {
    error: !!error,
    fullWidth,
    helperText,
    variant: "outlined",
    size: variant === "small" ? "small" : "medium",
    InputProps: {
      sx: {
        pr: 3,
        fontSize: variant === "small" ? "0.85rem" : "1rem",
        height: variant === "small" ? 40 : 48,
        paddingY: variant === "small" ? 1 : 1.5,
      },
    },
    inputProps: {
      style: {
        padding: variant === "small" ? "8px 10px" : "12px",
        fontSize: variant === "small" ? "0.85rem" : "1rem",
      },
    },
  };

  const picker = (
    <MUIDatepicker
      value={value}
      onChange={props.onChange}
      disabled={disabled}
      disableFuture={disableFutureDate}
      views={["year", "month", "day"]}
      format="dd/MM/yyyy"
      slotProps={{ textField: textFieldProps }}
      slots={{
        openPickerIcon: DatePickerIcon,
        switchViewIcon: DatePickerIcon,
        rightArrowIcon: RightArrowIcon,
        leftArrowIcon: LeftArrowIcon,
      }}
    />
  );

  if (noLayout) {
    return picker;
  }

  return (
    <FieldLayout
      label={label}
      helperText={error}
      labelSize={labelSize}
      inputSize={inputSize ?? 3}
    >
      {picker}
    </FieldLayout>
  );
}

export default DatePicker;
