import Checkbox from "@mui/material/Checkbox";
import type { ChangeEvent } from "react";

interface CategoryCheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function CategoryCheckbox({ checked, onChange }: CategoryCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      size="small"
      sx={{
        color: "#374151",
        "&.Mui-checked": { color: "#374151" },
        padding: "4px",
      }}
    />
  );
}