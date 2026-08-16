/**
 * Returns true when the event target is an editable element (text input,
 * textarea, select, contenteditable region, combobox, …). Global keyboard
 * shortcuts should be skipped in those cases so typing works normally and
 * browser/devtools text inputs are never hijacked.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
    return true;
  }

  if (target.isContentEditable) {
    return true;
  }

  const role = target.getAttribute("role");
  if (
    role === "textbox" ||
    role === "searchbox" ||
    role === "combobox" ||
    role === "spinbutton" ||
    role === "listbox"
  ) {
    return true;
  }

  return (
    target.closest(
      'input, textarea, select, [contenteditable="true"], [contenteditable=""], [role="textbox"], [role="searchbox"], [role="combobox"], [role="spinbutton"], [role="listbox"]',
    ) !== null
  );
}
