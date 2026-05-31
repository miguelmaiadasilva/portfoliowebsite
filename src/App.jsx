import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
