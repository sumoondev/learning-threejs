import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

const root = createRoot(document.querySelector('#root'))

root.render(
    <div>
        <App />
    </div>
)