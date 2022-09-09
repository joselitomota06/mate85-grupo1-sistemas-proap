import { createRoot } from 'react-dom/client'
import App from './App'
import './main.scss'
const root = createRoot(document.querySelector('#root'))

root.render(<App />)
