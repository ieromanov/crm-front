export function getValueFromEvent(event: InputEvent) {
  const target = event.target as HTMLInputElement
  return target.value
}