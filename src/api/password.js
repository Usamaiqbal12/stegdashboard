const validate = (p) => {
  if (p.length < 8) {
    return [false, "Password must be at least 8 characters long"];
  }

  if (! /[a-z]/.test(p)) {
    return [false, "Password must have at least one lowercase letter"];
  }

  if (! /[A-Z]/.test(p)) {
    return [false, "Password must have at least one uppercase letter"];
  }

  if (! /[0-9]/.test(p)) {
    return [false, "Password must have at least one digit"];
  }

  return [true, null];
};

export {
  validate
};