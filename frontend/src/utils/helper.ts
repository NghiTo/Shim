export function convertCamelCaseToTitleCase(input: string) {
  if (!input) return "";

  const result = input.replace(/([A-Z])/g, " $1").trim();

  return result.charAt(0).toUpperCase() + result.slice(1);
}
