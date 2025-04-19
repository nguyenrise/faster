function createErrorer(errorElement) {
  let instances = {};

  function display(errorMessage, key, parent) {
    if (instances[key]) return;

    const clonedErrorElement = errorElement.cloneNode(true);
    clonedErrorElement.innerHTML = errorMessage;
    instances[key] = clonedErrorElement;

    parent.append(clonedErrorElement);
  }

  function removeAll() {
    Object.values(instances).forEach((errorElement) => errorElement.remove());
    instances = {};
  }

  return { display, removeAll };
}

export { createErrorer };
