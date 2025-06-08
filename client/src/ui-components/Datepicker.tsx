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
  variant?: string;
  error?: string;
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
  ...props
}: DatePickerProps) {
  return (
    <FieldLayout label={label} helperText={error} inputSize={3}>
      <MUIDatepicker
        value={value}
        onChange={props.onChange}
        disabled={disabled}
        disableFuture={disableFutureDate ? true : false}
        slotProps={{
          textField: {
            error: !!error,
            fullWidth: true,
            helperText: helperText,
            variant: "outlined",
            InputProps: {
              sx: {
                pr: 3,
              },
            },
          },
        }}
        slots={{
          openPickerIcon: DatePickerIcon,
          switchViewIcon: DatePickerIcon,
          rightArrowIcon: RightArrowIcon,
          leftArrowIcon: LeftArrowIcon,
        }}
      />
    </FieldLayout>
  );
}
