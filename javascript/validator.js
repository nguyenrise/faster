const v = {
  required(errorMessage) {
    return function (value) {
      return {
        isValid: Boolean(value),
        errorMessage,
      };
    };
  },
  regex(regex, errorMessage) {
    return function (value) {
      return {
        isValid: regex.test(value),
        errorMessage,
      };
    };
  },
};

function createValidator(validateObject) {
  function validate(data) {
    const errors = {};
    Object.entries(data).forEach(([key, value]) => {
      const fieldErrors = validateObject[key]?.reduce((fieldErrors, check) => {
        const { isValid, errorMessage } = check(value);
        if (!isValid) {
          fieldErrors.push(errorMessage);
        }
        return fieldErrors;
      }, []);
      if (fieldErrors && fieldErrors.length !== 0) {
        errors[key] = fieldErrors;
      }
    });
    return Object.keys(errors).length === 0 ? null : errors;
  }

  return { validate };
}

export { v, createValidator };
