export const handleFocus = (field) => {
  const inputElement =
    document.getElementById(`${field}`) ||
    document.querySelector(`[name="${field}"]`);
  if (inputElement) {
    inputElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    if (["INPUT", "SELECT", "TEXTAREA"].includes(inputElement.tagName)) {
      inputElement.focus();
    } else {
      const focusableChild = inputElement.querySelector(
        "input, select, textarea"
      );
      if (focusableChild) focusableChild.focus();
    }
  }
};
