import React, { FC } from 'react';
import InputCheckboxProps from './dto';

const InputCheckbox: FC<InputCheckboxProps> = ({
  rowId,
  checkboxKey,
  label,
  checked,
  additionalStyle = {},
  onCheckboxChange,
}): JSX.Element => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: updatedCheckedValue } = e.target;

    const updatedParams: Parameters<typeof onCheckboxChange>[0] = {
      rowId,
      key: checkboxKey,
      updatedValue: updatedCheckedValue,
    };

    onCheckboxChange({ ...updatedParams });
  };

  return (
    <div style={{ ...additionalStyle }}>
      <label>{label}</label>
      <input type='checkbox' checked={checked} onChange={handleCheckboxChange} />
    </div>
  );
};

export default React.memo(InputCheckbox);
