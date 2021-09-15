import React, {useContext} from 'react'
import {gameContext} from '../App'

function Menu() {

    const {gameView, setGameView} = useContext(gameContext)
    return (
        <div>
            <h1>Menu</h1>
            <button onClick={()=>{
                setGameView('quiz')
            }}>Start</button>
        </div>
    )
}

export default Menu
