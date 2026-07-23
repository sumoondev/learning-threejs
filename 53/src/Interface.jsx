import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import useGame from './stores/useGame'

export default function Interface()
{
    const time = useRef()

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const jump = useKeyboardControls((state) => state.jump)

    useEffect(() =>
    {
        const unsubscribeEffect = addEffect(() =>
        {
            const state = useGame.getState()
            
            let elaspedTime = 0

            if(state.phase === 'playing')
                elaspedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elaspedTime = state.endTime - state.startTime

            elaspedTime /= 1000
            elaspedTime = elaspedTime.toFixed(2)
            
            if(time.current)
                time.current.textContent = elaspedTime
        })

        return () =>
        {
            unsubscribeEffect()
        }
    }, [])

    return <div className="interface">
        
        {/* Time */}
        <div ref={ time } className="time">0.00</div>
        
        {/* Restart */}
        { phase === 'ended' ? <div className="restart" onClick={ restart } >Restart</div> : null }

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                <div className={ `key ${ backward ? 'active' : '' }` }></div>
                <div className={ `key ${ rightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ jump ? 'active' : '' }` }></div>
            </div>
        </div>
    </div>
}