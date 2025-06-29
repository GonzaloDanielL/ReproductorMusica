import { Link, Route, Routes, useLocation } from 'react-router-dom'

import { FaMusic } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { IoLink } from "react-icons/io5";

import Inicio from './pages/inicio.jsx'
import Favoritos from './pages/favoritos.jsx'
import Albums from './pages/albums.jsx'
import Reproductor from './components/Reproductor.jsx';

import AudioLoader from './components/AudioLoader.jsx';

import './App.css'

function App() {
  const location = useLocation();

  return (
    <>
      <AudioLoader />

      <nav className='navegacion'>
        <h1><FaMusic /> <span>Música</span></h1>
        <div className='navegacion-link'>
          <Link to={'/inicio'} className={location.pathname === '/inicio' ? 'link-acivado' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34A10 10 0 1 1 2 12l.005-.324A10 10 0 0 1 17 3.34M17 11a1 1 0 0 0-1 1a4 4 0 0 1-4 4a1 1 0 0 0 0 2a6 6 0 0 0 6-6a1 1 0 0 0-1-1m-5-1a2 2 0 0 0-1.995 1.85L10 12a2 2 0 1 0 2-2m0-4a6 6 0 0 0-6 6a1 1 0 0 0 2 0a4 4 0 0 1 4-4a1 1 0 0 0 0-2" /></svg>
            Música</Link>

          <Link to={'/favoritos'} className={location.pathname === '/favoritos' ? 'link-acivado' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
            Favoritos</Link>

          <Link to={'/albums'} className={location.pathname === '/albums' ? 'link-acivado' : ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.544c.385-.897 1.292-1.563 2.4-1.672C8.098 2 8.276 2 8.51 2m-2.2 2.723c-1.39 0-2.53.84-2.91 1.954l-.024.07c.398-.12.813-.2 1.232-.253c1.08-.139 2.446-.139 4.032-.139h6.892c1.586 0 2.951 0 4.032.139c.42.054.834.132 1.232.253l-.023-.07c-.38-1.114-1.52-1.954-2.911-1.954zM11.25 17a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0" /><path fill="currentColor" d="M8.672 7.542h6.656c3.374 0 5.062 0 6.01.987s.724 2.511.278 5.56l-.422 2.892c-.35 2.391-.525 3.587-1.422 4.303s-2.22.716-4.867.716h-5.81c-2.646 0-3.97 0-4.867-.716s-1.072-1.912-1.422-4.303l-.422-2.891c-.447-3.05-.67-4.574.278-5.561s2.636-.987 6.01-.987M12.75 10.5a.75.75 0 0 0-1.5 0v4.378A2.25 2.25 0 1 0 12.75 17v-3.68c.67.543 1.512.93 2.25.93a.75.75 0 0 0 0-1.5c-.305 0-.886-.219-1.416-.69c-.519-.46-.834-1.021-.834-1.56" /></svg>
            Albums</Link>
        </div>
        <div className='navegacion-link'>
          <button>Listas <span>+</span></button>
          <Link to={'/inicio'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 5h-2v5.37c0 1.27-.9 2.44-2.16 2.6a2.505 2.505 0 0 1-2.8-2.95c.2-1.1 1.18-1.95 2.3-2.02c.63-.04 1.2.16 1.66.51V6c0-.55.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1" /></svg>
            Lista1</Link>
          <Link to={'/inicio'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3 5h-2v5.37c0 1.27-.9 2.44-2.16 2.6a2.505 2.505 0 0 1-2.8-2.95c.2-1.1 1.18-1.95 2.3-2.02c.63-.04 1.2.16 1.66.51V6c0-.55.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1" /></svg>
            Lista1</Link>
        </div>
      </nav>

      <main className='contenido'>

        <div className='contenido-busqueda'>
          <div className='contenido-busqueda-input'>
            <input type="text" placeholder='Buscar canciones...' />
            <button><FaSearch /></button>
          </div>
          <div className='contenido-busqueda-links'>
            <a href="https://github.com/GonzaloDanielL" target='_blank'><TbBrandGithubFilled /></a>
            <a href="https://chalo-portafolio.vercel.app/" target='_blank'><IoLink /></a>
          </div>
        </div>

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/albums" element={<Albums />} />
        </Routes>

      </main >

      <Reproductor />
    </>
  )
}

export default App
