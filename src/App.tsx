import React, {ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import { acceptSettingsAC, incrementAC, onChangeMaxValueAC, onChangeStartValueAC, resetAC, setSettingsAC, StateType } from "./state/reducer";
import { AppRootStateType } from "./state/store";

function App() {

  const state = useSelector<AppRootStateType, StateType>(state => state.incState)
  const dispatch = useDispatch();

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(onChangeMaxValueAC(e.currentTarget.value))
  }

  const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(onChangeStartValueAC(e.currentTarget.value))
  }

  const acceptSettings = () => {
    dispatch(acceptSettingsAC())
  }

  const setSettings = () => {
    dispatch(setSettingsAC())
    if(state.isMaxValue) {
      dispatch(resetAC())
    }
  }

  const increment = () => {
    dispatch(incrementAC())
  }

  const reset = () => {
    dispatch(resetAC())
  }


  // const [maxValue, setMaxValue] = useState<string>("5");
  // const [startValue, setStartValue] = useState<string>("0");
  // const [incValue, setIncValue] = useState<string>("0");
  // const [isSetting, setIsSetting] = useState<boolean>(true);
  // const [isError, setIsError] = useState<boolean>(false);
  // const [isMaxValue, setIsMaxValue] = useState<boolean>(false);

  // useEffect(() => {
  //   let getMaxValue = localStorage.getItem("maxValue")
  //   if(getMaxValue) {
  //     setMaxValue(getMaxValue)
  //   }
  //   let getStarValue = localStorage.getItem("startValue")
  //   if(getStarValue) {
  //     setStartValue(getStarValue)
  //     setIncValue(getStarValue)
  //   }

  //   let getError = localStorage.getItem("error")
  //   if(getError) {
  //     setIsError(true)
  //   }
  // },[])

  // const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMaxValue(e.currentTarget.value)
  //   if(incValue!==startValue){
  //     setIncValue(startValue)
  //   }
  //   localStorage.setItem("maxValue", e.currentTarget.value)
  //   if(Number(e.currentTarget.value)<1 || Number(e.currentTarget.value)<=Number(startValue)) {
  //     setIsError(true)
  //     localStorage.setItem("error", "error")
  //   }

  //   if(isError && Number(e.currentTarget.value)>0 && Number(e.currentTarget.value)>Number(startValue)) {
  //     setIsError(false)
  //     localStorage.removeItem("error")
  //   }
  // }

  // const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStartValue(e.currentTarget.value)
  //   setIncValue(e.currentTarget.value)
  //   localStorage.setItem("startValue", e.currentTarget.value)
  //   localStorage.setItem("incValue", e.currentTarget.value)

  //   if(Number(e.currentTarget.value)<0 || Number(e.currentTarget.value)>=Number(maxValue)) {
  //     setIsError(true)
  //     localStorage.setItem("error", "error")
  //   }

  //   if(isError && Number(e.currentTarget.value)>-1 && Number(e.currentTarget.value)<Number(maxValue)) {
  //     setIsError(false)
  //     localStorage.removeItem("error")
  //   }
  // }

  // const acceptSettings = () => {
  //   setIsSetting(false)
  // }

  // const setSettings = () => {
  //   setIsSetting(true)
  //   if(isMaxValue) {
  //     reset()
  //   }
  // }

  // const increment = () => {
  //   const newIncValue = Number(incValue)+1
  //   setIncValue(String(newIncValue))
  //   localStorage.setItem("incValue", String(newIncValue))
  //   if(newIncValue===Number(maxValue)) {
  //     setIsMaxValue(true)
  //   }
  // }

  // const reset = () => {
  //   setIncValue(startValue)
  //   setIsMaxValue(false)
  //   localStorage.setItem("incValue", "startValue")
  // }

  return (
    <div className="App">
      <h1 className="title">Vadim Chursin</h1>
      <div className="block_element">
        <div className="show_block settings">
          <div className="set_value">
            Max value: <input className={!state.isError ? "" : "show_error"} type="number" value={state.maxValue} onChange={onChangeMaxValue} onFocus={setSettings} />
          </div>
          <div className="set_value">
            Start value: <input className={!state.isError ? "" : "show_error"} type="number" value={state.startValue} onChange={onChangeStartValue} onFocus={setSettings} />
          </div>
        </div>

        <div className="button_block">
          <button disabled={state.isError || !state.isSetting} className={state.isSetting && !state.isError ? "" : "button_disable"} onClick={acceptSettings}>set</button>
        </div>
      </div>

      <div className="block_element">
        <div className="show_block">
          {state.isSetting && !state.isError && <div>Enter value and press "set"</div>}
          {!state.isSetting && !state.isError && <div className={state.isMaxValue ? "active" : ""}>{state.incValue}</div>}
          {state.isError && <div className="show_error">Incorrected value!</div>}
        </div>
        <div className="button_block button_block_right">
          <button disabled={state.isMaxValue || state.isSetting} className={state.isSetting || state.isMaxValue ? "button_disable" : ""} onClick={increment}>inc</button>
          <button disabled={state.isSetting} className={!state.isSetting ? "" : "button_disable"} onClick={reset}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
