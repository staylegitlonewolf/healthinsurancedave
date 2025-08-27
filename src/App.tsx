import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Health Insurance Dave</h1>
        <p>Welcome to our clean, working website!</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Health Insurance</li>
            <li>NIL (Name, Image, Likeness)</li>
            <li>Solar Solutions</li>
            <li>Certifications</li>
          </ul>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </header>
    </div>
  )
}

export default App
