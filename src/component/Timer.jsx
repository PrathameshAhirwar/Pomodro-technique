import React, { useEffect, useState } from 'react'
import style from './timer.module.css'

const Timer = () => {
    const [min,setmin] = useState("25")
    const [sec,setSec] = useState("00")
    const [rest,setRest] = useState(5)
    const [isRunning,setIsRunning] = useState(false)
    const [breakStatus,setBreakStatus] = useState(true)

    

    useEffect(()=>{
      if(!isRunning) return;

      const time = setInterval(()=>{
        setSec((prevSec)=>{
          if (prevSec > 0 ) {
            return prevSec -1
          }
          else if(min > 0){
            setmin((tim)=> tim-1)
            return 59;
          }
          else{
            clearInterval(time);
            if(min >= 0){
              if(breakStatus){
                console.log(`break status is ${breakStatus}`)
                setmin(5)
                setBreakStatus(false)
              }
              else{
                console.log(`break status is ${breakStatus}`)
                setmin(25)
                setBreakStatus(true)
              }
            }

            return 0;
          }
        })
        
      },1000)

      return ()=>clearInterval(time)
    },[isRunning,min])

  const onStart = ()=> setIsRunning(true);
  const onStop = ()=> setIsRunning(false);
  const onReset = ()=>{
    setIsRunning(false)
    setmin("25")
    setSec("00")
  }


  return (
    <div className={style.container}>
      <h1>{min}:{sec}</h1>
      <h1>Work - Time</h1>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button><br />
      <input type="text" defaultValue="25"/> 
      <input type="text" defaultValue="5" />
      <button>set</button>
    </div>
  )
}

export default Timer
