import React, { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = {
  Temperature: [
    {time:"12:55",value:37.8},{time:"13:00",value:38.0},{time:"13:05",value:38.2},
    {time:"13:10",value:38.1},{time:"13:15",value:38.4},{time:"13:20",value:38.3},{time:"13:25",value:38.5}
  ],
  Vibration: [
    {time:"12:55",value:1.8},{time:"13:00",value:1.9},{time:"13:05",value:1.9},
    {time:"13:10",value:2.0},{time:"13:15",value:2.0},{time:"13:20",value:2.1},{time:"13:25",value:2.1}
  ],
  Current: [
    {time:"12:55",value:1.7},{time:"13:00",value:1.8},{time:"13:05",value:1.8},
    {time:"13:10",value:1.8},{time:"13:15",value:1.8},{time:"13:20",value:1.8},{time:"13:25",value:1.8}
  ],
  Voltage: [
    {time:"12:55",value:12.2},{time:"13:00",value:12.2},{time:"13:05",value:12.1},
    {time:"13:10",value:12.1},{time:"13:15",value:12.1},{time:"13:20",value:12.1},{time:"13:25",value:12.1}
  ],
  Speed: [
    {time:"12:55",value:120},{time:"13:00",value:120},{time:"13:05",value:121},
    {time:"13:10",value:120},{time:"13:15",value:119},{time:"13:20",value:120},{time:"13:25",value:120}
  ]
};

const sensors = [
  {name:"Temperature", value:"38.5", unit:"°C"},
  {name:"Vibration", value:"2.1", unit:"mm/s"},
  {name:"Motor Current", value:"1.8", unit:"A"},
  {name:"Voltage", value:"12.1", unit:"V"},
  {name:"Speed", value:"120", unit:"RPM"}
];

function SensorCard({sensor, active, onClick}) {
  return <button className={`sensor-card ${active ? "active" : ""}`} onClick={onClick}>
    <div className="sensor-label">{sensor.name}</div>
    <div className="sensor-value">{sensor.value} <span>{sensor.unit}</span></div>
    <div className="status"><i />Normal</div>
  </button>;
}

function App() {
  const [selected, setSelected] = useState("Temperature");
  const chartData = useMemo(() => data[selected], [selected]);

  return <main className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">SC</div><div><strong>Smart Conveyor</strong><span>Monitoring System</span></div></div>
      <nav>
        <button className="nav-item selected">Overview</button>
        <button className="nav-item">Digital Twin</button>
        <button className="nav-item">Trends</button>
        <button className="nav-item">Maintenance</button>
        <button className="nav-item">Events</button>
      </nav>
      <div className="sidebar-bottom"><span className="small-label">ASSET</span><strong>SC-01</strong><span className="connection"><i/> MQTT not connected</span></div>
    </aside>

    <section className="workspace">
      <header className="topbar">
        <div><div className="eyebrow">INDUSTRIAL MONITORING</div><h1>Overview</h1><p>Digital Twin-Based Prognostics</p></div>
        <div className="header-right"><div className="asset-id">SC-01</div><div className="online"><i/> Online</div></div>
      </header>

      <section className="sensor-grid">
        {sensors.map(s => <SensorCard key={s.name} sensor={s} active={selected===s.name} onClick={()=>setSelected(s.name)}/>)}
      </section>

      <section className="main-grid">
        <div className="panel twin-panel">
          <div className="panel-head"><div><h2>Conveyor Digital Twin</h2><span>SC-01-TWIN · Synchronized</span></div><span className="tag">LIVE MODEL</span></div>
          <div className="conveyor">
            <div className="motor"><div className="motor-body">M</div><small>Motor</small></div>
            <div className="belt"><div className="belt-line"/><div className="roller r1"/><div className="roller r2"/><div className="roller r3"/></div>
            <div className="roller-unit"><div className="large-roller"/><small>Drive Roller</small></div>
          </div>
          <div className="twin-footer"><span>Motor <b>Running</b></span><span>Belt <b>Running</b></span><span>Sync <b>100%</b></span></div>
        </div>

        <div className="panel health-panel">
          <div className="panel-head"><h2>System Health</h2><span>Current</span></div>
          <div className="health-score">87<span>/100</span></div><div className="health-state"><i/> Healthy</div>
          <div className="health-bars"><div><span>Normal</span><b>87%</b><em style={{width:"87%"}}/></div><div><span>Warning</span><b>10%</b><em style={{width:"10%"}}/></div><div><span>Critical</span><b>3%</b><em style={{width:"3%"}}/></div></div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel chart-panel">
          <div className="panel-head"><div><h2>Sensor Trends</h2><span>Last 30 minutes · {selected}</span></div><span className="chart-legend"><i/> {selected}</span></div>
          <ResponsiveContainer width="100%" height={255}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7ebf0"/>
              <XAxis dataKey="time" stroke="#788392" fontSize={12}/>
              <YAxis stroke="#788392" fontSize={12}/>
              <Tooltip/>
              <Line type="monotone" dataKey="value" stroke="#1d5fa7" strokeWidth={2.5} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="panel condition-panel">
          <div className="panel-head"><h2>Current Condition</h2></div>
          <div className="condition-status">NORMAL</div>
          <p>All monitored parameters are within the configured operating range.</p>
          <div className="condition-row"><span>Anomaly score</span><b>0.18</b></div>
          <div className="condition-row"><span>Detection model</span><b>Isolation Forest</b></div>
          <div className="condition-row"><span>Last evaluation</span><b>13:25:42</b></div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel"><div className="panel-head"><h2>Prognostics</h2><span className="muted">Decision support</span></div>
          <div className="prognostic-main"><div className="prognostic-icon">✓</div><div><strong>No developing fault detected</strong><p>Continue normal monitoring.</p></div></div>
        </div>
        <div className="panel"><div className="panel-head"><h2>Maintenance</h2><span className="tag neutral">NO ACTION</span></div>
          <div className="maintenance-row"><span>Priority</span><b>None</b></div><div className="maintenance-row"><span>Recommended action</span><b>Continue monitoring</b></div><div className="maintenance-row"><span>Next review</span><b>Based on condition trend</b></div>
        </div>
      </section>

      <section className="panel events-panel"><div className="panel-head"><div><h2>Recent Events</h2><span>System activity</span></div></div>
        <div className="event"><time>13:25:42</time><span className="dot green"/><p>Sensor data updated</p><b>Normal</b></div>
        <div className="event"><time>13:20:00</time><span className="dot green"/><p>Digital Twin synchronized</p><b>Completed</b></div>
        <div className="event"><time>13:10:00</time><span className="dot green"/><p>Condition evaluation completed</p><b>Normal</b></div>
      </section>
      <footer>Smart Conveyor · SC-01 · Prototype Dashboard · Last update 13:25:42</footer>
    </section>
  </main>;
}
export default App;
