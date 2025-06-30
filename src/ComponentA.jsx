import { useEffect, useRef, useState } from "react"


function ComponentA(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    let intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIDRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }

        return() => {clearInterval(intervalIDRef.current)}
    }, [isRunning])

    const start = () => {
        startTimeRef.current = Date.now() - elapsedTime
        setIsRunning(true)
    }

    const stop = () => {
        setIsRunning(false)
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false)

    }

    const formatTime = () => {

        let minutes = Math.floor(elapsedTime/ (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime/ (1000) % 60)
        let milliseconds = Math.floor((elapsedTime % 1000) / 10)

        return`${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`
    }

    const pad = (number) => {
        return (number < 10? "0": "") + number
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 ">
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-80 text-center">
      <h1 className="text-3xl font-bold m-4">⏱ Stopwatch</h1>

      <div className="text-3xl m-9">{formatTime()}</div>

      <div className="flex justify-between">
        <button
          onClick={start}
          className="bg-teal-400 hover:bg-teal-500 px-5 py-2 rounded-xl text-white shadow-xl"
        >
          Start
        </button>
        
        <button
          onClick={reset}
          className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-xl text-white shadow-xl"
        >
          Reset
        </button>
        <button
          onClick={stop}
          className="bg-violet-500 hover:bg-violet-600 px-5 py-2 rounded-xl text-white shadow-xl"
        >
          Stop
        </button>
      </div>
    </div>
  </div>
    )

}

export default ComponentA