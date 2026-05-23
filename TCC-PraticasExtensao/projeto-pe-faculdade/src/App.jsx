import { useState } from 'react'
import PaginaLogin from './PaginaLogin.jsx'

export default function App() {
  const [count, setCount] = useState(0)

  return <>
    <PaginaLogin/>
  </>
} 
