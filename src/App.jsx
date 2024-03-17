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
//SizeVariation
const SizeVariation = lazy(()=>import("./views/size/sizeVariation/SizeVariation.jsx"));
const UpdateSizeVariation = lazy(()=>import("./views/size/sizeVariation/UpdateSizeVariation.jsx"));
//material
const Material = lazy(()=>import("./views/material/Material.jsx"));
const UpdateMaterial = lazy(()=>import("./views/material/UpdateMaterial.jsx"));
// product
const Product = lazy(()=>import("./views/product/Product.jsx"));
const CreateProduct = lazy(()=>import("./views/product/CreateProduct.jsx"));
const UpdateProduct = lazy(()=>import("./views/product/UpdateProduct.jsx"));
// Users
const Users = lazy(()=>import("./views/user/Users.jsx"));
const CrearUser = lazy(()=>import("./views/user/CrearUser.jsx"));
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
        <Route path='/product' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Product />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path='/product/create' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <CreateProduct />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
          } 
        />
        <Route path='/product/edit/:idProduct' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateProduct />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
          } 
        />
        <Route path='/product/category' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Category />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path='/product/category/create' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <CreateCategory />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path='/product/category/edit/:id' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateCategory />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path='/product/category/subcategory/:idCategory' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Subcategory />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path='/product/category/subcategory/create/:idCategory' element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <CreateSubcategory />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } 
        />
        <Route path="/product/category/subcategory/edit/:idSubcategory" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateSubcategory />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/security/menu" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Menu />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/security/menu/edit/:id" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateMenu />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/security/submenu" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <SubMenu />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/security/submenu/edit/:id" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateSubMenu />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        { /*relusuariomenusubmenucontroller */} 
        <Route path="/security/permissions" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <PermisosUser />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/security/permissions/:idUser" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <AddPermissions />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/size" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Size />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/size/edit/:id" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateSize />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/size/variation" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <SizeVariation />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/size/variation/edit/:idSizeVariation" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateSizeVariation />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/material" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Material />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/material/edit/:idMaterial" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <UpdateMaterial />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <Users />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="/user/create" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MenuAdmin>
                <CrearUser />
              </MenuAdmin>
            </Suspense>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
