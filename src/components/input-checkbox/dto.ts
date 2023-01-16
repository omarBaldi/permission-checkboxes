import React from 'react';
import { CheckboxLabel } from '../../App';

type InputCheckboxProps = {
  rowId: number;
  checkboxKey: CheckboxLabel;
  label: string;
  checked: boolean;
  additionalStyle?: React.CSSProperties;
  onCheckboxChange: ({
    rowId,
    key,
    updatedValue,
  }: {
    rowId: number;
    key: CheckboxLabel;
    updatedValue: boolean;
  }) => void;
};

export default InputCheckboxProps;
