export function assertTrue(condition, message) {
  if (!condition) {
    const logMessage = message || "Assertion failed";
    console.error(`✗ Failed -> ${logMessage}`);
    throw `✗ Failed -> ${logMessage}`;
  }
}
