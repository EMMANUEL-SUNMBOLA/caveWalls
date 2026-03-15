/**
 * Validates an array of input states to ensure they have no errors and no empty values
 * @param {import('./useInput.js').InputState[]} inputs - An array of InputState objects from useInput hook
 * @returns {boolean} - true if all inputs are valid (no errors and no empty values), false otherwise
 */
export function validateInputs(inputs) {
  for (const input of inputs) {
    // Check if the input has an error state or if the value is empty (considering whitespace-only as empty)
    if (input.error || !input.value.trim()) {
      return false;
    }
  }
  return true;
}

/**
 * Alternative function with more detailed validation options
 * @param {import('./useInput.js').InputState[]} inputs - An array of InputState objects from useInput hook
 * @param {Object} options - Options for validation behavior
 * @param {boolean} [options.allowWhitespaceOnly=false] - Whether to allow whitespace-only values as valid
 * @param {boolean} [options.skipEmptyCheck=false] - Whether to skip the check for empty values
 * @returns {boolean} - true if all inputs are valid, false otherwise
 */
export function validateInputsAdvanced(inputs, options = {}) {
  const { allowWhitespaceOnly = false, skipEmptyCheck = false } = options;

  for (const input of inputs) {
    // Check if the input has an error state
    if (input.error) {
      return false;
    }

    // Check for empty values if not skipped
    if (!skipEmptyCheck) {
      const isEmpty = allowWhitespaceOnly ? !input.value : !input.value.trim();
      if (isEmpty) {
        return false;
      }
    }
  }
  return true;
}
