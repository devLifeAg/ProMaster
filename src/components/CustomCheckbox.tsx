import React, { useState } from 'react';
import fonts from '../styles/fonts';

interface CustomCheckboxProps {
  id: string;
  label: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, label, onChange, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label htmlFor={id} className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div className="
        w-5 h-5 rounded-full border-2 border-gray-400
        flex items-center justify-center
        peer-checked:bg-red-600 peer-checked:border-red-600
        transition duration-300
      ">
      </div>
      <span className="ml-2 text-gray-600 text-sm" style={{ fontFamily: fonts.inter }}>
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;
