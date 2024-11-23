const getFirebaseErrorMessage = (errorMessage) => {
  if (!errorMessage) return "An unknown error occurred";

  // Remove the "Firebase: Error (" prefix and ")" suffix
  let cleanMessage = errorMessage.replace("auth/", "");

  // Replace hyphens with spaces and capitalize the first letter of each word
  cleanMessage = cleanMessage
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return cleanMessage;
};

export default getFirebaseErrorMessage;
