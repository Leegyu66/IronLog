export const colors = {
  background: '#F6F6F8',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F2F6',
  border: '#E8E8EE',
  track: '#EEEEF2',

  text: '#0B0B0D',
  textSecondary: '#8A8A90',
  textInverse: '#FFFFFF',

  primary: '#1C1C1E',
  success: '#7BD97A',
  danger: '#E5484D',

  protein: '#E0685B',
  carbs: '#DE9463',
  fat: '#5B8FD6',
} as const;

export type ColorToken = keyof typeof colors;
