import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
    <>
		<App clickersCount={ 3 }>
			<h1>My First React App</h1>
			<h2>And a fancy subtitle</h2>
		</App>
    </>
)
