export const isNullOrUndefined = <T>(
  value?: T | null
): value is null | undefined => value === null || value === undefined;
