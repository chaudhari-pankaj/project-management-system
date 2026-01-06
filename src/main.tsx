import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeProvider from './context/theme/Index.tsx'
import ProjectProvider from './context/projects/Index.tsx'
import MembersProvider from './context/members/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProjectProvider>
        <MembersProvider>
          <App />
        </MembersProvider>
      </ProjectProvider>
    </ThemeProvider>
  </StrictMode>,
)
