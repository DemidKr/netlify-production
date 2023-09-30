import { PropsWithChildren } from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type IProps = {
  label: string;
  labelId: string;
  value: string;
  onSelect: (value: string) => void;
  fullWidth: boolean;
};

export const CustomSelect = ({
  label,
  children,
  value,
  labelId,
  onSelect,
  fullWidth,
}: PropsWithChildren<IProps>) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        labelId={labelId}
        onChange={(e) => onSelect(e.target.value)}
      >
        {children}
      </Select>
    </FormControl>
  );
};
