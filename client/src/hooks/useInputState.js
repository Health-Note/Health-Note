import { useCallback, useState, useRef } from 'react';

const MIN_LENGTH_ERROR = 'MIN_LENGTH_ERROR'
const TYPE_ERROR = 'TYPE_ERROR'

const useInputState = (settings) => {
  const {
    type,
    maxLength,
    minLength,
    autoFix = true,
    initialValue
  } = settings;
  const [value, setter] = useState(initialValue);
  const isError = useRef('');

  const handleString = useCallback((receivedValue) => {
    let result = receivedValue;

    if (maxLength) {
      result = result.substring(0, maxLength);
    }

    const returnValue = autoFix ? result : receivedValue;


    if (result === receivedValue && returnValue.length <= minLength) {
      isError.current = MIN_LENGTH_ERROR;
    } else {
      isError.current = '';
    }

    if (type === 'email') {
      const emailRegEx = /\S+@\S+\.\S+/;
      if (!emailRegEx.test(returnValue)) {
        isError.current = TYPE_ERROR;
      } else {
        isError.current = '';
      }
    }
    setter(returnValue);

  }, [minLength, maxLength, autoFix]);

  const onChangeInput = useCallback((e) => {
    const targetValue = e.target.value || '';
      handleString(targetValue);
  }, [type, handleString]);

  return [value, onChangeInput, isError.current];
}

export default useInputState;
