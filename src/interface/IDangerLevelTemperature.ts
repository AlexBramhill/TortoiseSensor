export interface IDangerLevelTemp {
  dangerLevelEnum: EDangerLevelTemp;
  displayText: string;
  cssColour: string;
}

export enum EDangerLevelTemp {
  DANGER_LOW,
  LOW,
  SUITABLE,
  HIGH,
  DANGER_HIGH,
  MISSING,
}

const DANGERLOW: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.DANGER_LOW,
  displayText: "Danger Low",
  cssColour: "danger",
};
const LOW: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.LOW,
  displayText: "Low",
  cssColour: "warning",
};
const SUITABLE: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.SUITABLE,

  displayText: "Suitable",
  cssColour: "success",
};
const HIGH: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.HIGH,
  displayText: "High",
  cssColour: "warning",
};
const DANGER_HIGH: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.DANGER_HIGH,

  displayText: "Danger High",
  cssColour: "danger",
};
const MISSING: IDangerLevelTemp = {
  dangerLevelEnum: EDangerLevelTemp.MISSING,
  displayText: "Missing",
  cssColour: "warning",
};

export const getDangerLevelByTemp = (temp: number | null) => {
  if (!temp || temp === null) {
    return EDangerLevelTemp.MISSING;
  }
  if (temp <= 2) {
    return EDangerLevelTemp.DANGER_LOW;
  }
  if (temp <= 4) {
    return EDangerLevelTemp.LOW;
  }
  if (temp >= 9) {
    return EDangerLevelTemp.DANGER_HIGH;
  }
  if (temp >= 7) {
    return EDangerLevelTemp.HIGH;
  }
  return EDangerLevelTemp.SUITABLE;
};

export const getDangerLevelSpecByDangerLevelTemp = (
  dangerLevel: EDangerLevelTemp
): IDangerLevelTemp => {
  switch (dangerLevel) {
    case EDangerLevelTemp.SUITABLE:
      return SUITABLE;
    case EDangerLevelTemp.DANGER_LOW:
      return DANGERLOW;
    case EDangerLevelTemp.LOW:
      return LOW;
    case EDangerLevelTemp.HIGH:
      return HIGH;
    case EDangerLevelTemp.DANGER_HIGH:
      return DANGER_HIGH;
    default:
      return MISSING;
  }
};

export const getDangerLevelSpecByTemp = (
  temp: number | null
): IDangerLevelTemp => {
  const dangerLevel = getDangerLevelByTemp(temp);
  return getDangerLevelSpecByDangerLevelTemp(dangerLevel);
};
