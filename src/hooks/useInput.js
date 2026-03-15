import { useState } from 'react';

/**
 * @typedef {Object} ValidationObject
 * @property {string|RegExp} tomatch - The pattern or string to match against
 * @property {string} message - The error message to display when validation fails
 * @property {string} [id] - Optional ID field
 */

/**
 * @typedef {Object} InputState
 * @property {string} value - The current input value
 * @property {function(string): void} setValue - Function to update the input value
 * @property {string} info - Additional information message
 * @property {function(string): void} setInfo - Function to update the info message
 * @property {boolean} error - Error state flag
 * @property {function(boolean): void} setError - Function to update the error state
 */

/**
 * Custom React hook for managing input state with optional validation
 * @param {string} [initialValue=""] - The initial value for the input
 * @param {ValidationObject} [validation] - Optional validation object
 * @returns {InputState} - Object containing input state and control functions
 */
export function useInput(initialValue = '', validation) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState('');

  // Create a setValue that handles validation directly
  const validatedSetValue = (newValue) => {
    setValue(newValue);

    if (validation) {
      let isValid = true;

      if (typeof validation.tomatch === 'string') {
        // If tomatch is a string, check if the input value contains it
        isValid = newValue === validation.tomatch;
      } else {
        // If tomatch is a RegExp, create a new instance and test it against the input value
        // This avoids issues with global regex state
        const regex = new RegExp(
          validation.tomatch.source,
          validation.tomatch.flags,
        );
        isValid = regex.test(newValue);
      }

      setError(!isValid);
      setInfo(isValid ? '' : validation.message);
    } else {
      // If no validation, reset error and info
      setError(false);
      setInfo('');
    }
  };

  return {
    value,
    setValue: validatedSetValue,
    info,
    setInfo,
    error,
    setError,
  };
}

/**
 * Custom React hook that provides debounced input with validation
 * @param {Object} options - Configuration options
 * @param {number} options.afterMs - Delay in milliseconds before executing the function
 * @param {function(string): Promise<void>} options.fxn - Async function to execute with the input value
 * @param {string} options.validationMsg - Message to display on validation error
 * @param {string} [options.loadingMessage] - Optional loading message to display
 * @returns {InputState & {disabled: boolean}} - Input state with additional disabled property
 */
export function useDebouncedInput({
  afterMs,
  fxn,
  validationMsg,
  loadingMessage,
}) {
  const debounceInput = useInput('');
  const [myInterval, setMyInterval] = useState(null);
  const [disabled, setDisabled] = useState(false);

  async function internalfxn(value) {
    try {
      setDisabled(true);
      if (loadingMessage) {
        debounceInput.setInfo(loadingMessage);
      }
      await fxn(value);
      debounceInput.setInfo('');
    } catch (error) {
      debounceInput.setError(true);
      debounceInput.setInfo(error.message || validationMsg);
    } finally {
      setDisabled(false);
    }
  }

  function debounce(newValue) {
    if (myInterval) {
      clearTimeout(myInterval);
    }
    const newInterval = setTimeout(() => internalfxn(newValue), afterMs);
    debounceInput.setValue(newValue);
    setMyInterval(newInterval);
  }

  return { ...debounceInput, setValue: debounce, disabled };
}
