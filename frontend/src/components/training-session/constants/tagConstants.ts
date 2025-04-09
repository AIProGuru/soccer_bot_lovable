
import {
  BETWEEN_LINES_TAGS,
  COUNTER_ATTACKING_TAGS,
  POSSESSION_BASED_TAGS,
  HIGH_PRESSING_TAGS,
  VERTICAL_DIRECT_PLAY_TAGS,
  DEFENSIVE_SHAPE_TAGS,
  SMALL_SIDED_GAMES_TAGS,
  PHYSICAL_CONDITIONING_TAGS,
  MENTAL_TOUGHNESS_TAGS,
  WING_PLAY_TAGS
} from './tag-categories';

export const getTagsByTrainingStyle = (trainingStyle: string): string[] => {
  switch (trainingStyle) {
    case "counter":
      return COUNTER_ATTACKING_TAGS;
    case "possession":
      return POSSESSION_BASED_TAGS;
    case "pressing":
      return HIGH_PRESSING_TAGS;
    case "vertical":
      return VERTICAL_DIRECT_PLAY_TAGS;
    case "defensive":
      return DEFENSIVE_SHAPE_TAGS;
    case "smallSided":
      return SMALL_SIDED_GAMES_TAGS;
    case "physical":
      return PHYSICAL_CONDITIONING_TAGS;
    case "mental":
      return MENTAL_TOUGHNESS_TAGS;
    case "wing":
      return WING_PLAY_TAGS;
    case "betweenLines":
      return BETWEEN_LINES_TAGS;
    default:
      return [];
  }
};

export {
  BETWEEN_LINES_TAGS,
  COUNTER_ATTACKING_TAGS,
  POSSESSION_BASED_TAGS,
  HIGH_PRESSING_TAGS,
  VERTICAL_DIRECT_PLAY_TAGS,
  DEFENSIVE_SHAPE_TAGS,
  SMALL_SIDED_GAMES_TAGS,
  PHYSICAL_CONDITIONING_TAGS,
  MENTAL_TOUGHNESS_TAGS,
  WING_PLAY_TAGS
};
