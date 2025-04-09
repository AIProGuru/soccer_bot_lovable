
import { getStyleDisplayName } from './types';
import type { SessionTemplate } from './types';
import { possessionTemplates } from './possession';
import { oneVsOneTemplates } from './oneVsOne';
import { pressingTemplates } from './pressing';
import { highPressTemplates } from './highPress';
import { pressResistanceTemplates } from './pressResistance';
import { counterAttackTemplates } from './counterAttack';
import { verticalTemplates } from './vertical';
import { smallSidedTemplates } from './smallSided';
import { physicalTemplates } from './physical';
import { mentalTemplates } from './mental';
import { wingTemplates } from './wing';
import { betweenLinesTemplates } from './betweenLines';
import { defendingTemplates } from './defending';
import { otherTemplates } from './others';

// Combine all templates
export const defaultTemplates = [
  ...possessionTemplates,
  ...oneVsOneTemplates,
  ...pressingTemplates,
  ...highPressTemplates,
  ...pressResistanceTemplates,
  ...counterAttackTemplates,
  ...verticalTemplates,
  ...smallSidedTemplates,
  ...physicalTemplates,
  ...mentalTemplates,
  ...wingTemplates,
  ...betweenLinesTemplates,
  ...defendingTemplates,
  ...otherTemplates
];

// Re-export the helper function
export { getStyleDisplayName };

// Re-export the type with 'export type' syntax
export type { SessionTemplate };
