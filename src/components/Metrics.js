import React from 'react'

const Metrics = ({cpu_usage, hostname, fs_usage, mem_usage}) => {

    const fs_percent = Array.isArray(fs_usage) && fs_usage.length > 0 ? fs_usage[0].percent: 0
    const hostname_short = hostname.length > 20 ? hostname.substring(0, 17) + '...': hostname
    const cpu_color = {}
    const mem_color = {}
    const disk_color = {}

    if(cpu_usage >= 80 && cpu_usage <= 90) {
        cpu_color = {color: '#febd7d'}
    }
    if(cpu_usage >= 90) {
        cpu_color = {color: '#f59598'}
    }
    
    if(mem_usage >= 80 && mem_usage <= 90) {
        mem_color = {color: '#febd7d'}
    }
    if(mem_usage >= 90) {
        mem_color = {color: '#f59598'}
    }
    
    if(fs_percent >= 80 && fs_percent <= 90) {
        disk_color = {color: '#febd7d'}
    }
    if(fs_percent >= 90) {
        disk_color = {color: '#f59598'}
    }

    return (
        <div className="txt_left clear-after f18">
            <p style={{height: 39}} title={`Hostname: ${hostname}`} className="txt_center f20 faccented">{hostname_short}</p>
            <div style={{height: 34}} title="CPU Usage">
                <span className="va_middle material-icons f25">memory</span> &nbsp;
                <span className="va_middle" style={cpu_color}>{cpu_usage}%</span>
            </div>
            <div style={{height: 34}} title="Memory Usage">
                <span className="va_middle material-icons f25 flip_v">straighten</span> &nbsp;
                <span className="va_middle" style={mem_color}>{mem_usage}%</span>
            </div>
            <div style={{height: 34}} title="Disk Usage">
                <span className="va_middle material-icons f25">save</span> &nbsp;
                <span className="va_middle" style={disk_color}>{fs_percent}%</span>
            </div>
        </div>
    )
}

export default Metrics