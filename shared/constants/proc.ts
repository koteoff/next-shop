export const mapProcType = {
  1: "Box",
  2: "OEM",
} as const;

export const procType = Object.entries(mapProcType).map(([value, name]) => ({
  name,
  value,
}));
export type ProcType = keyof typeof mapProcType;
