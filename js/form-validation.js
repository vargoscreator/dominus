// document.addEventListener("DOMContentLoaded", () => {
//   const forms = document.querySelectorAll(".js-auth-form");

//   forms.forEach((form) => {
//     const inputs = {
//       firstName: form.querySelector("#firstName"),
//       lastName: form.querySelector("#lastName"),
//       email: form.querySelector("#email"),
//       phone: form.querySelector("#phone"),
//       password: form.querySelector("#password"),
//     };

//     const errors = {};
//     for (const key in inputs) {
//       if (inputs[key]) {
//         errors[key] = inputs[key].nextElementSibling;
//       }
//     }

//     // ======== ВАЛІДАЦІЯ ========
//     if (inputs.firstName) {
//       inputs.firstName.addEventListener("input", () => {
//         const value = inputs.firstName.value.trim();
//         if (!value) {
//           hideError(errors.firstName, inputs.firstName);
//         } else if (value.length < 2) {
//           showError(
//             errors.firstName,
//             "* Must be at least 2 characters",
//             inputs.firstName
//           );
//         } else {
//           hideError(errors.firstName, inputs.firstName);
//         }
//       });
//     }

//     if (inputs.lastName) {
//       inputs.lastName.addEventListener("input", () => {
//         const value = inputs.lastName.value.trim();
//         if (!value) {
//           hideError(errors.lastName, inputs.lastName);
//         } else if (value.length < 2) {
//           showError(
//             errors.lastName,
//             "* Must be at least 2 characters",
//             inputs.lastName
//           );
//         } else {
//           hideError(errors.lastName, inputs.lastName);
//         }
//       });
//     }

//     if (inputs.email) {
//       inputs.email.addEventListener("input", () => {
//         const value = inputs.email.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!value) {
//           hideError(errors.email, inputs.email);
//         } else if (!emailRegex.test(value)) {
//           showError(errors.email, "* Invalid email format", inputs.email);
//         } else {
//           hideError(errors.email, inputs.email);
//         }
//       });
//     }

//     if (inputs.phone) {
//       inputs.phone.addEventListener("input", () => {
//         const value = inputs.phone.value.trim();
//         const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;

//         if (!value) {
//           hideError(errors.phone, inputs.phone);
//         } else if (!phoneRegex.test(value)) {
//           showError(errors.phone, "* Invalid phone number", inputs.phone);
//         } else {
//           hideError(errors.phone, inputs.phone);
//         }
//       });
//     }

//     if (inputs.password) {
//       inputs.password.addEventListener("input", () => {
//         const value = inputs.password.value.trim();

//         if (!value) {
//           hideError(errors.password, inputs.password);
//         } else if (value.length < 6) {
//           showError(
//             errors.password,
//             "* Password must be at least 6 characters",
//             inputs.password
//           );
//         } else {
//           hideError(errors.password, inputs.password);
//         }
//       });
//     }

//     // ======== SUBMIT ВАЛІДАЦІЯ ========
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       let valid = true;

//       if (inputs.firstName) {
//         const value = inputs.firstName.value.trim();
//         if (!value) {
//           showError(errors.firstName, "* Required field", inputs.firstName);
//           valid = false;
//         } else if (value.length < 2) {
//           showError(
//             errors.firstName,
//             "* Must be at least 2 characters",
//             inputs.firstName
//           );
//           valid = false;
//         }
//       }

//       if (inputs.lastName) {
//         const value = inputs.lastName.value.trim();
//         if (!value) {
//           showError(errors.lastName, "* Required field", inputs.lastName);
//           valid = false;
//         } else if (value.length < 2) {
//           showError(
//             errors.lastName,
//             "* Must be at least 2 characters",
//             inputs.lastName
//           );
//           valid = false;
//         }
//       }

//       if (inputs.email) {
//         const value = inputs.email.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!value) {
//           showError(errors.email, "* Required field", inputs.email);
//           valid = false;
//         } else if (!emailRegex.test(value)) {
//           showError(errors.email, "* Invalid email format", inputs.email);
//           valid = false;
//         }
//       }

//       if (inputs.phone) {
//         const value = inputs.phone.value.trim();
//         const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
//         if (!value) {
//           showError(errors.phone, "* Required field", inputs.phone);
//           valid = false;
//         } else if (!phoneRegex.test(value)) {
//           showError(errors.phone, "* Invalid phone number", inputs.phone);
//           valid = false;
//         }
//       }

//       if (inputs.password) {
//         const value = inputs.password.value.trim();
//         if (!value) {
//           showError(errors.password, "* Required field", inputs.password);
//           valid = false;
//         } else if (value.length < 6) {
//           showError(
//             errors.password,
//             "* Password must be at least 6 characters",
//             inputs.password
//           );
//           valid = false;
//         }
//       }

//       if (valid) form.submit();
//     });
//   });

//   // ======== АНІМАЦІЯ ПОМИЛОК ========
//   function showError(element, message, input) {
//     if (!element) return;
//     if (element.textContent !== message) element.textContent = message;

//     input.classList.add("input-error");

//     element.style.display = "block";
//     setTimeout(() => {
//       element.style.opacity = "1";
//       element.style.transform = "translateY(0)";
//     }, 10);
//   }

//   function hideError(element, input) {
//     if (!element) return;
//     input.classList.remove("input-error");

//     element.style.opacity = "0";
//     element.style.transform = "translateY(-0.5vw)";
//     setTimeout(() => {
//       element.style.display = "none";
//     }, 300);
//   }

//   // ======== CUSTOM SELECT ========

// });
const selects = document.querySelectorAll(".custom-select");

  selects.forEach((select) => {
    const trigger = select.querySelector(".custom-select__trigger");
    const dropdown = select.querySelector(".custom-select__dropdown");
    const options = select.querySelectorAll(".custom-select__option");
    const span = trigger.querySelector("span");

    trigger.addEventListener("click", () => {
      selects.forEach((s) => s !== select && s.classList.remove("open"));
      select.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
        span.textContent = option.textContent;
        select.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".js-auth-form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input[required]");
    const textareas = form.querySelectorAll("textarea.form-required");
    const selects = form.querySelectorAll("select.form-required");
    const fileInput = form.querySelector('input[type="file"]');
    const fileError = fileInput ? fileInput.closest(".auth-form__field").querySelector(".auth-form__error") : null;
    const checkboxGroups = form.querySelectorAll(".form-checkboxes.form-required");

    inputs.forEach((input) => {
      input.addEventListener("input", () => validateField(input));
    });

    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => validateTextarea(textarea));
    });

    selects.forEach((select) => {
      select.addEventListener("change", () => validateSelect(select));
    });

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0 && fileError) hideError(fileError, fileInput);
      });
    }

    checkboxGroups.forEach((group) => {
      const checkboxes = group.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
          if (cb.checked) hideError(group.closest(".auth-form__field").querySelector(".auth-form__error"), group);
        });
      });
    });

    function validateField(input) {
      const value = input.value.trim();
      const type = input.type;
      const errorElement = input.nextElementSibling;

      if (!value) {
        showError(errorElement, "* Required field", input);
        return false;
      }

      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          showError(errorElement, "* Invalid email format", input);
          return false;
        }
      }

      if (type === "tel") {
        const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
        if (!phoneRegex.test(value)) {
          showError(errorElement, "* Invalid phone number", input);
          return false;
        }
      }

      if (type === "number") {
        if (isNaN(value) || value <= 0) {
          showError(errorElement, "* Invalid number", input);
          return false;
        }
      }

      hideError(errorElement, input);
      return true;
    }

    function validateTextarea(textarea) {
      const value = textarea.value.trim();
      const errorElement = textarea.nextElementSibling;

      if (!value) {
        showError(errorElement, "* Required field", textarea);
        return false;
      } else {
        hideError(errorElement, textarea);
        return true;
      }
    }

    function validateSelect(select) {
      const value = select.value;
      const errorElement = select.closest(".auth-form__field").querySelector(".auth-form__error");

      if (!value) {
        showError(errorElement, "* Required field", select);
        return false;
      } else {
        hideError(errorElement, select);
        return true;
      }
    }

    function validateCheckboxGroup(group) {
      const checkboxes = group.querySelectorAll("input[type='checkbox']");
      const errorElement = group.closest(".auth-form__field").querySelector(".auth-form__error");
      let checked = false;
      checkboxes.forEach((cb) => { if (cb.checked) checked = true; });

      if (!checked) {
        showError(errorElement, "* Required field", group);
        return false;
      } else {
        hideError(errorElement, group);
        return true;
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      inputs.forEach((input) => { if (!validateField(input)) valid = false; });
      textareas.forEach((textarea) => { if (!validateTextarea(textarea)) valid = false; });
      selects.forEach((select) => { if (!validateSelect(select)) valid = false; });
      if (fileInput && fileInput.files.length === 0) { if (fileError) showError(fileError, "* Required field", fileInput); valid = false; }
      checkboxGroups.forEach((group) => { if (!validateCheckboxGroup(group)) valid = false; });

      if (valid) form.submit();
    });

    function showError(element, message, input) {
      if (!element) return;
      element.textContent = message;
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) input.classList.add("input-error");
      else if (input.classList) input.classList.add("input-error");
      element.style.display = "block";
      setTimeout(() => { element.style.opacity = "1"; element.style.transform = "translateY(0)"; }, 10);
    }

    function hideError(element, input) {
      if (!element) return;
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) input.classList.remove("input-error");
      else if (input.classList) input.classList.remove("input-error");
      element.style.opacity = "0";
      element.style.transform = "translateY(-0.5vw)";
      setTimeout(() => { element.style.display = "none"; }, 300);
    }
  });
});


