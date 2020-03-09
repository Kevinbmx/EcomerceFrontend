import LoginPage from "./views/auth/Login"
// import MainPage from "./components/administration/mainPage"
import RegisterPage from "./views/auth/Register"
import Logout from "./views/auth/Logout"

import CategoryAdmin from "./views/administration/category/index"

import Product from "./views/administration/product/index"
import ProductForm from "./views/administration/product/form"
import ProductDetail from "./views/main/productDetail/productDetail"
// import MainPage from "./views/administration/aboutUs/MainPage"

// import About from "./views/administration/aboutUs/About"
// import Category from "./views/administration/category/category"
//--------------------------------------------------------------------
import MainPage from "./views/main/mainPage/mainPage"
import Categories from "./views/main/categories/categories"
import Search from "./views/main/search/search"
import Carrito from "./views/main/cart/cart"
import Pedido from "./views/main/pedido/pedido"


const routes = [
  // //----------------------------------Registro y login-----------------------------------------
  {path: "/login", component : LoginPage, name:"login", props:true, meta:{visitor:true,public: true,}},
  {path: "/register", component : RegisterPage, name:"register", meta:{visitor:true,public: true}},
  {path: "/logout", component : Logout, name:"logout", meta:{requiresAuth:true}},
  // //----------------------------------Main Page-----------------------------------------
  // {path: "/mainpage", component:MainPage, name:"mainPage", meta:{requiresAuth:true}},
  // //-----------------------------------Category-----------------------------------------
  {path: "/admin/category", component:CategoryAdmin, name:"mainCategory", meta:{requiresAuth:true}},
  // //-----------------------------------Product-----------------------------------------
  {path: "/admin/product", component:Product, name:"mainProduct", meta:{requiresAuth:true}},
  {path: "/admin/product/create", component:ProductForm, name:"createProduct", meta:{requiresAuth:true}},
  {path: "/admin/product/:id/edit", component:ProductForm, name: "editProduct", meta: {requiresAuth:true, mode: "edit"}},
  // //-----------------------------------product Detail-----------------------------------------
  {path: "/productDetail/:id", component:ProductDetail, name:"productDetail",meta:{requiresAuth:true,public: true}},


  // //-----------------------------------Attribute-----------------------------------------
  // {path: "/mainpage", component:MainPage, name: "mainPage"},
  // {path: "/about", component:About, name: "about", meta: {
  //   public: true,
  // },},
  // {path: "/category", component:Category, name: "category"},
  //-------------------------------------------------------------------------------------
  //-----------------------------------Main Page-----------------------------------------
  {path: "/", component:MainPage, name:"mainPage", meta:{requiresAuth:true,public: true}},




  //-----------------------------------Category-----------------------------------------
  {path: "/categories/", component:Categories, name:"categories", meta:{requiresAuth:true,public: true}},

// --------------------------------------search------------------------------------------
  {path: "/search", component:Search, name:"search", meta:{requiresAuth:true,public: true},
  props: (route) => ({ query:[route.query.id , route.query.page , route.query.q] })},
  
  //----------------------------------------------------------------------------
  //----------------------------------------cart-----------------------------------------
  {path: "/carrito/", component:Carrito, name:"carrito", meta:{requiresAuth:true,public: true}},
  //------------------------------------------------------------------------------------
  //--------------------------------------pedido----------------------------------------
  {path: "/pedido", component:Pedido, name:"pedido", meta:{requiresAuth:true,public: true},
  props: (route) => ({ query:[ route.query.page] })},
]
export default routes;
