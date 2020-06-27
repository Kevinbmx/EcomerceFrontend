import LoginPage from "./views/auth/Login"
// import MainPage from "./components/administration/mainPage"
import RegisterPage from "./views/auth/Register"
import Logout from "./views/auth/Logout"

import CategoryAdmin from "./views/administration/category/index"

import Product from "./views/administration/product/index"
import ProductForm from "./views/administration/product/form"
import ProductDetail from "./views/main/productDetail/productDetail"
import WithoutAccess from "./views/administration/WithoutAccess"

// import About from "./views/administration/aboutUs/About"
// import Category from "./views/administration/category/category"
//--------------------------------------------------------------------
import MainPage from "./views/main/mainPage/mainPage"
import Categories from "./views/main/categories/categories"
import Search from "./views/main/search/search"
import Carrito from "./views/main/cart/cart"
import Pedido from "./views/main/pedido/pedido"

//------------------------module---------------------
import Module from "./views/administration/module/index"
import Moduleform from "./views/administration/module/form"
//----------------------------------------------------
//--------------------permission------------------------
import Permission from "./views/administration/permission/index"
import PermisosPorModulo from "./views/administration/permission/permisosPorModulo"
import Permissionform from "./views/administration/permission/form"
//--------------------------------------------------------

//------------------------role---------------------
import Role from "./views/administration/role/index"
import Roleform from "./views/administration/role/form"
//----------------------------------------------------


//------------------------role_permission---------------------
import RolePermission from "./views/administration/role_permission/index"
import RolePermissionView from "./views/administration/role_permission/view"
//----------------------------------------------------
//------------------no existe----------------
import PageNotFound from "./views/administration/WithoutAccess"


const routes = [
  // //----------------------------------Registro y login-----------------------------------------
  {path: "/login", component : LoginPage, name:"login", props:true, meta:{visitor:true,public: true}},
  {path: "/register", component : RegisterPage, name:"register", meta:{visitor:true,public: true}},
  {path: "/logout", component : Logout, name:"logout", meta:{requiresAuth:true}},
  // //----------------------------------Main Page-----------------------------------------
  {path: "/admin/withoutAccess", component:WithoutAccess, name:"withoutAccess", meta:{requiresAuth:true}},
  // //-----------------------------------Category-----------------------------------------
  {path: "/admin/category", component:CategoryAdmin, name:"mainCategory", meta:{requiresAuth:true}},
  // //-----------------------------------Product-----------------------------------------
  {path: "/admin/product", component:Product, name:"mainProduct", meta:{requiresAuth:true}},
  {path: "/admin/product/create", component:ProductForm, name:"createProduct", meta:{requiresAuth:true}},
  {path: "/admin/product/:id/edit", component:ProductForm, name: "editProduct", meta: {requiresAuth:true, mode: "edit"}},
 

  //---------------------------------------module------------------------------------------
  {path: "/admin/module", component:Module, name:"mainModule",meta:{requiresAuth:true}},
  {path: "/admin/module/create", component:Moduleform, name:"createModule", meta:{requiresAuth:true}},
  {path: "/admin/module/:id/edit", component:Moduleform, name: "editModule", meta: {requiresAuth:true, mode: "edit"}},
  //-------------------------------------------------------------------------------------
  
   //---------------------------------------permission------------------------------------------
   {path: "/admin/modulepermission", component:Permission, name:"mainPermission",meta:{requiresAuth:true}},
   {path: "/admin/modulepermission/:idmodule", component:PermisosPorModulo, name:"mainPermisosPorModulo",meta:{requiresAuth:true}},
   {path: "/admin/permission/create/:idmodule", component:Permissionform, name:"createPermission", meta:{requiresAuth:true}},
   {path: "/admin/permission/:idpermission/edit/:idmodule", component:Permissionform, name: "editPermission", meta: {requiresAuth:true, mode: "edit"}},
   //-------------------------------------------------------------------------------------
   
  //---------------------------------------Role------------------------------------------
  {path: "/admin/role", component:Role, name:"mainRole",meta:{requiresAuth:true}},
  {path: "/admin/role/create", component:Roleform, name:"createRole", meta:{requiresAuth:true}},
  {path: "/admin/role/:id/edit", component:Roleform, name: "editRole", meta: {requiresAuth:true, mode: "edit"}},
  //-------------------------------------------------------------------------------------
   
  //---------------------------------------Role_permission------------------------------------------
   {path: "/admin/rolepermission", component:RolePermission, name:"mainRolePermission",meta:{requiresAuth:true}},
   {path: "/admin/rolepermission/:idrol", component:RolePermissionView, name:"mainVerRolePermission", meta:{requiresAuth:true}},
   //-------------------------------------------------------------------------------------

  // //-----------------------------------Attribute-----------------------------------------
  // {path: "/mainpage", component:MainPage, name: "mainPage"},
  // {path: "/about", component:About, name: "about", meta: {
  //   public: true,
  // },},
  // {path: "/category", component:Category, name: "category"},
  //-------------------------------------------------------------------------------------
  //-----------------------------------Main Page-----------------------------------------
  {path: "/", component:MainPage, name:"mainPage", meta:{public: true}},
  //---------------------------------------------------------------------------------------
  //-----------------------------------Category-----------------------------------------
  {path: "/categories/", component:Categories, name:"categories", meta:{public: true}},
  //---------------------------------------------------------------------------------------
  // --------------------------------------search------------------------------------------
  {path: "/search", component:Search, name:"search", meta:{public: true},
  props: (route) => ({ query:[route.query.id , route.query.page , route.query.q] })},
  //--------------------------------------------------------------------------------------------
   // //-----------------------------------product Detail-----------------------------------------
   {path: "/productDetail/:id", component:ProductDetail, name:"productDetail",meta:{public: true}},
  //----------------------------------------------------------------------------
  //----------------------------------------cart-----------------------------------------
  {path: "/carrito/", component:Carrito, name:"carrito", meta:{public: true}},
  //------------------------------------------------------------------------------------
  //--------------------------------------pedido----------------------------------------
  {path: "/pedido", component:Pedido, name:"pedido", meta:{public: true},
    props: (route) => ({ query:[ route.query.page] })},
  { path: "/admin*", component: PageNotFound },
  { path: "/*", component: PageNotFound ,meta:{public: true}},
]
export default routes;
