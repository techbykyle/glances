import React from 'react'

const Temp = ({sensor}) => {

    const temp = Math.round((sensor.value * 9/5 + 32) * 10) / 10
    const warning_temp = sensor.warning && sensor.warning > 0 ? sensor.warning: 70
    const critical_temp = sensor.critical && sensor.critical > 0 ? sensor.critical - 5: 85

    let color = ''

    if(sensor.value >= warning_temp && sensor.value <= critical_temp) {
        color = '#febd7d'
    }

    if(sensor.value >= critical_temp) {
        color = '#f59598'
    }

    const parent_style = {
        display: 'inline-block',
        margin: '0 15px',
    }
    const circle_parent_style = {
        width: 100, 
        height: 100,
        position: 'relative',
        color
    }
    const circle_style = {
        textShadow: '1px 1px #2b2b2b',
        position: 'absolute', 
        top: 50, 
        left: '%50',
        transform: 'translate(-50%, -50%)',
        color
    }

    return (
        <div className="txt_center" style={parent_style}>
            <div style={circle_parent_style} className="light_bg circ">
                <span className="f24" style={circle_style}>{temp}&deg;F</span>
            </div>
            <div>{sensor.label}</div>
        </div>
    )
}

export default Temp