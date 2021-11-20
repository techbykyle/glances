import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Metrics from './Metrics'
import Temp from './Temp'

const QuickView = ({device, http, httpAction, tile, useHttp, useInterval}) => {

    const device_state = useSelector(state => state.DeviceController.data[tile.id], shallowEqual) || {}
    const user = useSelector(state => state.User)
    const hostname = device_state[http['system']]?.hostname || ''
    const cpu_usage = device_state[http['quicklook']]?.cpu || 0
    const mem_usage = device_state[http['quicklook']]?.mem || 0
    const fs_usage = device_state[http['fs']] || []
    const dispatch = useDispatch()
    const showTemps = () => {
        
        const sensors = device_state[http['sensors']]

        if(sensors &&sensors.length > 0) {
            return sensors.map((sensor, i)=> {
                return <Temp sensor={sensor} key={`${sensor.label}-${i}`} />
            })
        }
    }
    const info_style = { margin: '0 20px 0 5px' }

    useHttp(device.id, tile.id, http['fs'])
    useHttp(device.id, tile.id, http['limits'])
    useHttp(device.id, tile.id, http['quicklook'])
    useHttp(device.id, tile.id, http['sensors'])
    useHttp(device.id, tile.id, http['system'])

    useInterval(() => {
        httpAction(dispatch, user.token, device.id, tile.id, http['sensors'])
        httpAction(dispatch, user.token, device.id, tile.id, http['quicklook'])
    }, 5000)

    useInterval(() => {
        httpAction(dispatch, user.token, device.id, tile.id, http['fs'])
    }, 5 * 60000)

    return (
        <div style={{height: '100%'}}>
            <div className="float_l va_middle" style={info_style}>
                <Metrics cpu_usage={cpu_usage} mem_usage={mem_usage} fs_usage={fs_usage} hostname={hostname} />
            </div>
            <div className="float_l" style={{height: '100%', marginRight: 10, borderRight: '1px solid #424242'}}>&nbsp;</div>
            {showTemps()}
        </div>
    )
}

export default QuickView