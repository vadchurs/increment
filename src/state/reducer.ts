export type onChangeMaxValueType = {
  type: "ONCHANGE-MAX-VALUE";
  newValue: string;
};
export type onChangeStartValueType = {
  type: "ONCHANGE-START-VALUE";
  newValue: string;
};
export type acceptSettingsType = {
  type: "ACCEPT-SETTINGS";
};
export type setSettingsType = {
  type: "SET-SETTINGS";
};

export type resetType = {
  type: "RESET";
};

export type incrementType = {
    type: "INCREMENT";
  };

export type StateType = {
  maxValue: string;
  startValue: string;
  incValue: string;
  isSetting: boolean;
  isError: boolean;
  isMaxValue: boolean;
};

type ActionsType =
  | onChangeMaxValueType
  | onChangeStartValueType
  | acceptSettingsType
  | setSettingsType
  | resetType | incrementType

const initialState: StateType = {
  maxValue: "5",
  startValue: "0",
  incValue: "0",
  isSetting: true,
  isError: false,
  isMaxValue: false,
};

export const Reducer = (
  state: StateType = initialState,
  action: ActionsType
): StateType => {
  switch (action.type) {
    case "ONCHANGE-MAX-VALUE": {
      const stateCopy = { ...state };
      stateCopy.maxValue = action.newValue;
      if (stateCopy.incValue !== stateCopy.startValue) {
        stateCopy.incValue = stateCopy.startValue;
      }
      if (
        Number(action.newValue) < 1 ||
        Number(action.newValue) <= Number(stateCopy.startValue)
      ) {
        stateCopy.isError = true;
      }

      if (
        stateCopy.isError &&
        Number(action.newValue) > 0 &&
        Number(action.newValue) > Number(stateCopy.startValue)
      ) {
        stateCopy.isError = false;
      }

      return stateCopy;
    }
    case "ONCHANGE-START-VALUE": {
      const stateCopy = { ...state };
      stateCopy.startValue = action.newValue;
      stateCopy.incValue = action.newValue;

      if (
        Number(action.newValue) < 0 ||
        Number(action.newValue) >= Number(stateCopy.maxValue)
      ) {
        stateCopy.isError = true;
        localStorage.setItem("error", "error");
      }

      if (
        stateCopy.isError &&
        Number(action.newValue) > -1 &&
        Number(action.newValue) < Number(stateCopy.maxValue)
      ) {
        stateCopy.isError = false;
        localStorage.removeItem("error");
      }
      return stateCopy;
    }
    case "ACCEPT-SETTINGS": {
      const stateCopy = { ...state };
      stateCopy.isSetting = false;
      return stateCopy;
    }
    case "SET-SETTINGS": {
      const stateCopy = { ...state };
      stateCopy.isSetting = true;
      return stateCopy;
    }
    case "RESET": {
      const stateCopy = { ...state };
      stateCopy.incValue = stateCopy.startValue;
      stateCopy.isMaxValue = false;
      return stateCopy;
    }
    case "INCREMENT": {
        const stateCopy = { ...state };
        const newIncValue = Number(stateCopy.incValue)+1;
        stateCopy.incValue = String(newIncValue);
        if(newIncValue===Number(stateCopy.maxValue)) {
            stateCopy.isMaxValue = true;
        }
        return stateCopy;
      }
    default:
      return state;
  }
};

export const onChangeMaxValueAC = (newValue: string): onChangeMaxValueType => {
  return { type: "ONCHANGE-MAX-VALUE", newValue };
};
export const onChangeStartValueAC = (newValue: string): onChangeStartValueType => {
  return { type: "ONCHANGE-START-VALUE", newValue };
};
export const acceptSettingsAC = (): acceptSettingsType => {
  return { type: "ACCEPT-SETTINGS" };
};
export const setSettingsAC = (): setSettingsType => {
  return { type: "SET-SETTINGS" };
};

export const resetAC = (): resetType => {
  return { type: "RESET" };
};

export const incrementAC = (): incrementType => {
    return { type: "INCREMENT" };
  };
