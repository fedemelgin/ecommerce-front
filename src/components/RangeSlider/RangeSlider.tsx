import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface RangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const getAriaLabel = (_index: number) => "Price range";
const getValueText = (value: number) => `$${value}`;

export default function RangeSlider({ value, onChange, min = 0, max = 2000 }: RangeSliderProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange([newValue[0], newValue[1]] as [number, number]);
    }
  };

  return (
    <Box sx={{ width: "100%", px: 1 }}>
      <Slider
        getAriaLabel={getAriaLabel}
        getAriaValueText={getValueText}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </Box>
  );
}