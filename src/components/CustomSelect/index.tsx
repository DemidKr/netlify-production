import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { ISelectItem } from "../../entities";

type IProps = {
  label: string;
  labelId: string;
  value: string;
  onSelect: (value: string) => void;
  fullWidth: boolean;
  items: ISelectItem[];
  required?: boolean;
};

export const CustomSelect = ({
  label,
  value,
  labelId,
  onSelect,
  fullWidth,
  items,
  required,
}: IProps) => {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        labelId={labelId}
        onChange={(e) => onSelect(e.target.value)}
      >
        {items.map((item) => (
          <MenuItem key={item.code} value={item.code}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
