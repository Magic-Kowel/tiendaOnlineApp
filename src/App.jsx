import { lazy,Suspense } from 'react';
import Loader from './components/Loader.jsx';
const Home = lazy(() => import('./views/Home.jsx'));
const Store = lazy(()=> import('./views/store/Store.jsx'));
const Singup = lazy(() => import('./views/Singup.jsx'));
const Signin = lazy(()=> import('./views/Signin.jsx'));
const NotFound = lazy(()=>import('./views/NotFound.jsx'));
const ValidateUser = lazy(()=>import('./views/ValidateUser.jsx'));
const Category = lazy(()=>import('./views/category/Category.jsx'));
const CreateCategory = lazy(()=>import('./views/category/CreateCategory.jsx'));
const UpdateCategory = lazy(()=>import("./views/category/UpdateCategory.jsx"));
const Subcategory = lazy(()=> import("./views/subcategory/Subcategory.jsx"));
const UpdateSubcategory = lazy(()=>import("./views/subcategory/UpdateSubcategory.jsx"));
const CreateSubcategory = lazy(()=> import("./views/subcategory/CreateSubcategory.jsx"))
const Menu = lazy(()=>import("./views/security/menu/Menu.jsx"));
const UpdateMenu = lazy(()=>import("./views/security/menu/UpdateMenu.jsx"));

const SubMenu = lazy(()=>import("./views/security/subMenu/SubMenu.jsx"));
const UpdateSubMenu = lazy(()=>import("./views/security/subMenu/UpdateSubMenu.jsx"));
const PermisosUser = lazy(()=>import("./views/security/permisosUser/PermisosUser.jsx"));
const AddPermissions = lazy(()=>import("./views/security/permisosUser/AddPermissions.jsx"));
//size
const Size = lazy(()=>import("./views/size/Size.jsx"));
const UpdateSize = lazy(()=>import("./views/size/UpdateSize.jsx"));
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MenuAdmin from './components/menu/MenuAdmin.jsx';
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
      <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Loader />}>
            <Store />
          </Suspense>}
        />
        <Route path="/home" element={
          <ProtectedRoute>
            <MenuAdmin>
              <Home />
            </MenuAdmin>
          </ProtectedRoute>
          } 
        />
        <Route path="/signin" element={ 
          <Suspense fallback={<Loader />}>
            <Signin />
          </Suspense>}
        />
        <Route path="/singup" element={
          <Suspense fallback={<Loader />}>
            <Singup />
          </Suspense>}
        />
        <Route path="/user/validate/:uid" element={<ValidateUser />} />
        <Route path='/product/category' element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <Category />
            </MenuAdmin>
          </Suspense>
        } 
        />
        <Route path='/product/category/create' element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <CreateCategory />
            </MenuAdmin>
          </Suspense>
        } 
        />
        <Route path='/product/category/edit/:id' element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <UpdateCategory />
            </MenuAdmin>
          </Suspense>
        } 
        />
        <Route path='/product/category/subcategory/:idCategory' element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <Subcategory />
            </MenuAdmin>
          </Suspense>
        } 
        />
        <Route path='/product/category/subcategory/create/:idCategory' element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <CreateSubcategory />
            </MenuAdmin>
          </Suspense>
        } 
        />
        <Route path="/product/category/subcategory/edit/:idSubcategory" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <UpdateSubcategory />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/security/menu" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <Menu />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/security/menu/edit/:id" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <UpdateMenu />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/security/submenu" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <SubMenu />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/security/submenu/edit/:id" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <UpdateSubMenu />
            </MenuAdmin>
          </Suspense>
        } />
        { /*relusuariomenusubmenucontroller */} 
        <Route path="/security/permissions" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <PermisosUser />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/security/permissions/:idUser" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <AddPermissions />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/size" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <Size />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="/size/edit/:id" element={
          <Suspense fallback={<Loader />}>
            <MenuAdmin>
              <UpdateSize />
            </MenuAdmin>
          </Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
