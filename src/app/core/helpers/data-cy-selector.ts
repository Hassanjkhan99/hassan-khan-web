export function dataCySelector(selector: string) {
  return `[data-cy=${selector}]` as const;
}
