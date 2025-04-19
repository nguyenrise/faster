import { createErrorer } from "./errorer.js";
import { v, createValidator } from "./validator.js";
import { createForm } from "./form.js";

function contactForm() {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error-message");

  const errorer = createErrorer(errorElement);
  const validator = createValidator({
    name: [v.required("Name is required")],
    phone: [
      v.required("Phone number is required"),
      v.regex(/^\d{10}$/, "Invalid phone number"),
    ],
    email: [
      v.required("Email is required"),
      v.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    ],
  });
  const { handleForm } = createForm(
    document.getElementById("contact-form"),
    validator
  );

  handleForm(
    (formData) => {
      errorer.removeAll();
      console.log(formData);
    },
    (errors) => {
      errorer.removeAll();
      Object.entries(errors).forEach(([field, fieldErrors]) => {
        fieldErrors.forEach((errorMessage, i) => {
          const input = document.getElementById(field);
          input.focus();
          input.select();

          errorer.display(
            errorMessage,
            `${field}-${i}`,
            input.closest(".form-group")
          );
        });
      });
    },
    () => {
      errorer.removeAll();
    }
  );
}

contactForm();
