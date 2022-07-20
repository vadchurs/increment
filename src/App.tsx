import React, {ChangeEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [maxValue, setMaxValue] = useState<string>("5");
  const [startValue, setStartValue] = useState<string>("0");
  const [incValue, setIncValue] = useState<string>("0");
  const [isSetting, setIsSetting] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isMaxValue, setIsMaxValue] = useState<boolean>(false);

  useEffect(() => {
    let getMaxValue = localStorage.getItem("maxValue")
    if(getMaxValue) {
      setMaxValue(getMaxValue)
    }
    let getStarValue = localStorage.getItem("startValue")
    if(getStarValue) {
      setStartValue(getStarValue)
      setIncValue(getStarValue)
    }

    let getError = localStorage.getItem("error")
    if(getError) {
      setIsError(true)
    }
  },[])

  const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.currentTarget.value)
    localStorage.setItem("maxValue", e.currentTarget.value)
    if(Number(e.currentTarget.value)<1 || Number(e.currentTarget.value)<=Number(startValue)) {
      setIsError(true)
      localStorage.setItem("error", "error")
    }

    if(isError && Number(e.currentTarget.value)>0 && Number(e.currentTarget.value)>Number(startValue)) {
      setIsError(false)
      localStorage.removeItem("error")
    }
  }

  const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
    setStartValue(e.currentTarget.value)
    setIncValue(e.currentTarget.value)
    localStorage.setItem("startValue", e.currentTarget.value)
    localStorage.setItem("incValue", e.currentTarget.value)

    if(Number(e.currentTarget.value)<0 || Number(e.currentTarget.value)>=Number(maxValue)) {
      setIsError(true)
      localStorage.setItem("error", "error")
    }

    if(isError && Number(e.currentTarget.value)>-1 && Number(e.currentTarget.value)<Number(maxValue)) {
      setIsError(false)
      localStorage.removeItem("error")
    }
  }

  const acceptSettings = () => {
    setIsSetting(false)
  }

  const setSettings = () => {
    setIsSetting(true)
    if(isMaxValue) {
      reset()
    }
  }

  const increment = () => {
    const newIncValue = Number(incValue)+1
    setIncValue(String(newIncValue))
    localStorage.setItem("incValue", String(newIncValue))
    if(newIncValue===Number(maxValue)) {
      setIsMaxValue(true)
    }
  }

  const reset = () => {
    setIncValue(startValue)
    setIsMaxValue(false)
    localStorage.setItem("incValue", "startValue")
  }

  return (
    <div className="App">
      <h1 className="title">Vadim Chursin</h1>
      <div className="block_element">
        <div className="show_block settings">
          <div className="set_value">
            Max value: <input className={!isError ? "" : "show_error"} type="number" value={maxValue} onChange={onChangeMaxValue} onFocus={setSettings} />
          </div>
          <div className="set_value">
            Start value: <input className={!isError ? "" : "show_error"} type="number" value={startValue} onChange={onChangeStartValue} onFocus={setSettings} />
          </div>
        </div>

        <div className="button_block">
          <button disabled={isError || !isSetting} className={isSetting && !isError ? "" : "button_disable"} onClick={acceptSettings}>set</button>
        </div>
      </div>

      <div className="block_element">
        <div className="show_block">
          {isSetting && !isError && <div>Enter value and press "set"</div>}
          {!isSetting && !isError && <div className={isMaxValue ? "active" : ""}>{incValue}</div>}
          {isError && <div className="show_error">Incorrected value!</div>}
        </div>
        <div className="button_block button_block_right">
          <button disabled={isMaxValue || isSetting} className={isSetting || isMaxValue ? "button_disable" : ""} onClick={increment}>inc</button>
          <button disabled={isSetting} className={!isSetting ? "" : "button_disable"} onClick={reset}>reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
