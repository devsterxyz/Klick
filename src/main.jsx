
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './components/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ThemeToggle> 
      <App />
    </ThemeToggle>
  </ThemeProvider>
  
)
