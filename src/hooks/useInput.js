import { useState } from 'react';

export default function useInput(defaultValue) {

  const [value, setValue] = useState(defaultValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange,
  };
}