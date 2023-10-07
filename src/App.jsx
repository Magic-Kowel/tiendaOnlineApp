import { lazy } from 'react';
const Home = lazy(() => import('./views/Home.jsx'));
const Singup = lazy(() => import('./views/Singup.jsx'));
const NotFound = lazy(()=>import('./views/NotFound.jsx'))
const ValidateUser = lazy(()=>import('./views/ValidateUser.jsx'))
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/user/validate/:uid" element={<ValidateUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
