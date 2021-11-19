import React from 'react'

const Metrics = ({cpu_usage, hostname, fs_usage, mem_usage}) => {

    const fs_percent = Array.isArray(fs_usage) && fs_usage.length > 0 ? fs_usage[0].percent: 0
    const hostname_short = hostname.length > 20 ? hostname.substring(0, 17) + '...': hostname

    const colors = {
        cpu_color: {color: ''},
        mem_color: {color: ''},
        disk_color: {color: ''},
    }

    const checkThresholds = (type, value) => {
        if(value >= 80 && value <= 90) {
            colors[`${type}_color`] = {color: '#febd7d'}
        }
        if(value >= 90) {
            colors[`${type}_color`] = {color: '#f59598'}
        }
    }

    checkThresholds('cpu', cpu_usage)
    checkThresholds('mem', mem_usage)
    checkThresholds('disk', fs_percent)

    return (
        <div className="txt_left clear-after f18">
            <p style={{height: 39}} title={`Hostname: ${hostname}`} className="txt_center f20 faccented">{hostname_short}</p>
            <div style={{height: 34}} title="CPU Usage">
                <span className="va_middle material-icons f25" style={colors.cpu_color}>memory</span> &nbsp;
                <span className="va_middle" style={colors.cpu_color}>{cpu_usage}%</span>
            </div>
            <div style={{height: 34}} title="Memory Usage">
                <span className="va_middle material-icons f25 flip_v" style={colors.mem_color}>straighten</span> &nbsp;
                <span className="va_middle" style={colors.mem_color}>{mem_usage}%</span>
            </div>
            <div style={{height: 34}} title="Disk Usage">
                <span className="va_middle material-icons f25" style={colors.disk_color}>save</span> &nbsp;
                <span className="va_middle" style={colors.disk_color}>{fs_percent}%</span>
            </div>
        </div>
    )
}

export default Metrics