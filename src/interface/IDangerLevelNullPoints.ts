export interface IDangerLevelNullPoint {
  dangerLevelEnum: EDangerLevelNullPoint;
  displayText: string;
  cssColour: string;
}

export enum EDangerLevelNullPoint {
  SUITABLE,
  HIGH,
  DANGER_HIGH,
  MISSING,
}

const SUITABLE: IDangerLevelNullPoint = {
  dangerLevelEnum: EDangerLevelNullPoint.SUITABLE,

  displayText: "Suitable",
  cssColour: "success",
};
const HIGH: IDangerLevelNullPoint = {
  dangerLevelEnum: EDangerLevelNullPoint.HIGH,
  displayText: "High",
  cssColour: "warning",
};
const DANGER_HIGH: IDangerLevelNullPoint = {
  dangerLevelEnum: EDangerLevelNullPoint.DANGER_HIGH,

  displayText: "Danger High",
  cssColour: "danger",
};
const MISSING: IDangerLevelNullPoint = {
  dangerLevelEnum: EDangerLevelNullPoint.MISSING,
  displayText: "Missing",
  cssColour: "warning",
};

export const getDangerLevelByNullPoint = (
  nullCount: number
): EDangerLevelNullPoint => {
  if (nullCount >= 1) {
    return EDangerLevelNullPoint.HIGH;
  }
  if (nullCount >= 10) {
    return EDangerLevelNullPoint.DANGER_HIGH;
  }
  return EDangerLevelNullPoint.SUITABLE;
};

export const getDangerLevelSpecByDangerLevelNullPoint = (
  dangerLevel: EDangerLevelNullPoint
): IDangerLevelNullPoint => {
  switch (dangerLevel) {
    case EDangerLevelNullPoint.SUITABLE:
      return SUITABLE;
    case EDangerLevelNullPoint.HIGH:
      return HIGH;
    case EDangerLevelNullPoint.DANGER_HIGH:
      return DANGER_HIGH;
    default:
      return MISSING;
  }
};

export const getDangerLevelSpecByNullPointCount = (
  nullCount: number
): IDangerLevelNullPoint => {
  const dangerLevel = getDangerLevelByNullPoint(nullCount);
  return getDangerLevelSpecByDangerLevelNullPoint(dangerLevel);
};
