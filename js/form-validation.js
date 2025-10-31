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

//   const selects = document.querySelectorAll(".custom-select");

//   selects.forEach((select) => {
//     const trigger = select.querySelector(".custom-select__trigger");
//     const dropdown = select.querySelector(".custom-select__dropdown");
//     const options = select.querySelectorAll(".custom-select__option");
//     const span = trigger.querySelector("span");

//     trigger.addEventListener("click", () => {
//       selects.forEach((s) => s !== select && s.classList.remove("open"));
//       select.classList.toggle("open");
//     });

//     options.forEach((option) => {
//       option.addEventListener("click", () => {
//         options.forEach((opt) => opt.classList.remove("selected"));
//         option.classList.add("selected");
//         span.textContent = option.textContent;
//         select.classList.remove("open");
//       });
//     });

//     document.addEventListener("click", (e) => {
//       if (!select.contains(e.target)) {
//         select.classList.remove("open");
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".js-auth-form");

  forms.forEach((form) => {
    const inputs = {
      firstName: form.querySelector("#firstName"),
      lastName: form.querySelector("#lastName"),
      email: form.querySelector("#email"),
      phone: form.querySelector("#phone"),
      password: form.querySelector("#password"),
      currentPassword: form.querySelector("#currentPassword"),
      newPassword: form.querySelector("#newPassword"),
      confirmPassword: form.querySelector("#confirmPassword"),
    };

    const errors = {};
    for (const key in inputs) {
      if (inputs[key]) {
        errors[key] = inputs[key].nextElementSibling;
      }
    }

    // ======== ВАЛІДАЦІЯ ========
    if (inputs.firstName) {
      inputs.firstName.addEventListener("input", () => {
        const value = inputs.firstName.value.trim();
        if (!value) {
          hideError(errors.firstName, inputs.firstName);
        } else if (value.length < 2) {
          showError(
            errors.firstName,
            "* Must be at least 2 characters",
            inputs.firstName
          );
        } else {
          hideError(errors.firstName, inputs.firstName);
        }
      });
    }

    if (inputs.lastName) {
      inputs.lastName.addEventListener("input", () => {
        const value = inputs.lastName.value.trim();
        if (!value) {
          hideError(errors.lastName, inputs.lastName);
        } else if (value.length < 2) {
          showError(
            errors.lastName,
            "* Must be at least 2 characters",
            inputs.lastName
          );
        } else {
          hideError(errors.lastName, inputs.lastName);
        }
      });
    }

    if (inputs.email) {
      inputs.email.addEventListener("input", () => {
        const value = inputs.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
          hideError(errors.email, inputs.email);
        } else if (!emailRegex.test(value)) {
          showError(errors.email, "* Invalid email format", inputs.email);
        } else {
          hideError(errors.email, inputs.email);
        }
      });
    }

    if (inputs.phone) {
      inputs.phone.addEventListener("input", () => {
        const value = inputs.phone.value.trim();
        const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;

        if (!value) {
          hideError(errors.phone, inputs.phone);
        } else if (!phoneRegex.test(value)) {
          showError(errors.phone, "* Invalid phone number", inputs.phone);
        } else {
          hideError(errors.phone, inputs.phone);
        }
      });
    }

    if (inputs.password) {
      inputs.password.addEventListener("input", () => {
        const value = inputs.password.value.trim();

        if (!value) {
          hideError(errors.password, inputs.password);
        } else if (value.length < 6) {
          showError(
            errors.password,
            "* Password must be at least 6 characters",
            inputs.password
          );
        } else {
          hideError(errors.password, inputs.password);
        }
      });
    }

    // ======== ВАЛІДАЦІЯ ДЛЯ ФОРМИ ЗМІНИ ПАРОЛЯ ========
    if (inputs.currentPassword) {
      inputs.currentPassword.addEventListener("input", () => {
        const value = inputs.currentPassword.value.trim();

        if (!value) {
          hideError(errors.currentPassword, inputs.currentPassword);
        } else if (value.length < 6) {
          showError(
            errors.currentPassword,
            "* Password must be at least 6 characters",
            inputs.currentPassword
          );
        } else {
          hideError(errors.currentPassword, inputs.currentPassword);
        }
      });
    }

    if (inputs.newPassword) {
      inputs.newPassword.addEventListener("input", () => {
        const value = inputs.newPassword.value.trim();
        const currentValue = inputs.currentPassword
          ? inputs.currentPassword.value.trim()
          : "";

        if (!value) {
          hideError(errors.newPassword, inputs.newPassword);
        } else if (value.length < 6) {
          showError(
            errors.newPassword,
            "* Password must be at least 6 characters",
            inputs.newPassword
          );
        } else if (value === currentValue && currentValue) {
          showError(
            errors.newPassword,
            "* New password must differ from current",
            inputs.newPassword
          );
        } else {
          hideError(errors.newPassword, inputs.newPassword);
        }

        // Перевірка підтвердження пароля при зміні нового
        if (inputs.confirmPassword) {
          const confirmValue = inputs.confirmPassword.value.trim();
          if (confirmValue) {
            if (confirmValue !== value) {
              showError(
                errors.confirmPassword,
                "* Passwords do not match",
                inputs.confirmPassword
              );
            } else {
              hideError(errors.confirmPassword, inputs.confirmPassword);
            }
          }
        }
      });
    }

    if (inputs.confirmPassword) {
      inputs.confirmPassword.addEventListener("input", () => {
        const value = inputs.confirmPassword.value.trim();
        const newPasswordValue = inputs.newPassword
          ? inputs.newPassword.value.trim()
          : "";

        if (!value) {
          hideError(errors.confirmPassword, inputs.confirmPassword);
        } else if (value !== newPasswordValue) {
          showError(
            errors.confirmPassword,
            "* Passwords do not match",
            inputs.confirmPassword
          );
        } else {
          hideError(errors.confirmPassword, inputs.confirmPassword);
        }
      });
    }

    // ======== SUBMIT ВАЛІДАЦІЯ ========
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      if (inputs.firstName) {
        const value = inputs.firstName.value.trim();
        if (!value) {
          showError(errors.firstName, "* Required field", inputs.firstName);
          valid = false;
        } else if (value.length < 2) {
          showError(
            errors.firstName,
            "* Must be at least 2 characters",
            inputs.firstName
          );
          valid = false;
        }
      }

      if (inputs.lastName) {
        const value = inputs.lastName.value.trim();
        if (!value) {
          showError(errors.lastName, "* Required field", inputs.lastName);
          valid = false;
        } else if (value.length < 2) {
          showError(
            errors.lastName,
            "* Must be at least 2 characters",
            inputs.lastName
          );
          valid = false;
        }
      }

      if (inputs.email) {
        const value = inputs.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          showError(errors.email, "* Required field", inputs.email);
          valid = false;
        } else if (!emailRegex.test(value)) {
          showError(errors.email, "* Invalid email format", inputs.email);
          valid = false;
        }
      }

      if (inputs.phone) {
        const value = inputs.phone.value.trim();
        const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
        if (!value) {
          showError(errors.phone, "* Required field", inputs.phone);
          valid = false;
        } else if (!phoneRegex.test(value)) {
          showError(errors.phone, "* Invalid phone number", inputs.phone);
          valid = false;
        }
      }

      if (inputs.password) {
        const value = inputs.password.value.trim();
        if (!value) {
          showError(errors.password, "* Required field", inputs.password);
          valid = false;
        } else if (value.length < 6) {
          showError(
            errors.password,
            "* Password must be at least 6 characters",
            inputs.password
          );
          valid = false;
        }
      }

      // ======== SUBMIT ВАЛІДАЦІЯ ДЛЯ ФОРМИ ЗМІНИ ПАРОЛЯ ========
      if (inputs.currentPassword) {
        const value = inputs.currentPassword.value.trim();
        if (!value) {
          showError(
            errors.currentPassword,
            "* Required field",
            inputs.currentPassword
          );
          valid = false;
        } else if (value.length < 6) {
          showError(
            errors.currentPassword,
            "* Password must be at least 6 characters",
            inputs.currentPassword
          );
          valid = false;
        }
      }

      if (inputs.newPassword) {
        const value = inputs.newPassword.value.trim();
        const currentValue = inputs.currentPassword
          ? inputs.currentPassword.value.trim()
          : "";

        if (!value) {
          showError(errors.newPassword, "* Required field", inputs.newPassword);
          valid = false;
        } else if (value.length < 6) {
          showError(
            errors.newPassword,
            "* Password must be at least 6 characters",
            inputs.newPassword
          );
          valid = false;
        } else if (value === currentValue && currentValue) {
          showError(
            errors.newPassword,
            "* New password must differ from current",
            inputs.newPassword
          );
          valid = false;
        }
      }

      if (inputs.confirmPassword) {
        const value = inputs.confirmPassword.value.trim();
        const newPasswordValue = inputs.newPassword
          ? inputs.newPassword.value.trim()
          : "";

        if (!value) {
          showError(
            errors.confirmPassword,
            "* Required field",
            inputs.confirmPassword
          );
          valid = false;
        } else if (value !== newPasswordValue) {
          showError(
            errors.confirmPassword,
            "* Passwords do not match",
            inputs.confirmPassword
          );
          valid = false;
        }
      }

      if (valid) form.submit();
    });
  });

  // ======== АНІМАЦІЯ ПОМИЛОК ========
  function showError(element, message, input) {
    if (!element) return;
    if (element.textContent !== message) element.textContent = message;

    input.classList.add("input-error");

    element.style.display = "block";
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 10);
  }

  function hideError(element, input) {
    if (!element) return;
    input.classList.remove("input-error");

    element.style.opacity = "0";
    element.style.transform = "translateY(-0.5vw)";
    setTimeout(() => {
      element.style.display = "none";
    }, 300);
  }

  // ======== CUSTOM SELECT ========

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
});
