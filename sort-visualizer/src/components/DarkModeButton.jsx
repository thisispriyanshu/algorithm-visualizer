import React,{useState} from 'react'
import { useEffect } from 'react';
import '../styling/darkmode.css'

function DarkModeButton() {
    const [theme,setTheme] = useState('light')
    const toggleTheme = () => {
        if(theme === 'light'){
            setTheme('dark')
        }else{
            setTheme('light')
        }
    };
    
    useEffect(() => {
        document.body.className=theme;
    },[theme]);
  return (
    <div className={`${theme}`}>
    <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default DarkModeButton