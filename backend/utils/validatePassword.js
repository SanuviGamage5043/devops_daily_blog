// utils/validatePassword.js

export const validatePassword = (password) => {
  const rules = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
    { regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
    { regex: /[0-9]/, message: "Password must contain at least one number" },
    { regex: /[@$!%*?&]/, message: "Password must contain at least one special character (@$!%*?&)" },
  ];

  for (const rule of rules) {
    if (!rule.regex.test(password)) {
      return rule.message;
    }
  }

  return null; // No errors → valid password
};
