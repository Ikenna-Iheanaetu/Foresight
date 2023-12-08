const validateEmail = (emailToValidate) => {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(emailToValidate);
};


export default validateEmail