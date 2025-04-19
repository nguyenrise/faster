function createForm(formElement, validator) {
  function getFormData() {
    return Array.from(formElement.querySelectorAll(".input")).reduce(
      (prev, cur) => {
        return {
          [`${cur.id}`]: cur.value,
          ...prev,
        };
      },
      {}
    );
  }

  function handleForm(submitHandler, errorHandler, resetHandler) {
    formElement.addEventListener("submit", (e) => {
      const formData = getFormData();
      const errors = validator.validate(formData);

      if (errors) {
        e.preventDefault();
        errorHandler(errors);
      } else {
        submitHandler(formData);
      }
    });

    formElement.addEventListener("reset", () => {
      resetHandler();
    });
  }

  return { handleForm };
}

export { createForm };
