// export const apiDomain = 'http://webtrovare.test/'
export const apiDomain = ''
//---------------------AUTH--------------------------
export const loginUrl =  apiDomain + 'oauth/token'
export const userUrl = apiDomain + 'api/user'
export const loginUrlCustom = apiDomain + 'api/login'
export const logoutUrl = apiDomain + 'api/logout'
export const registertUrl = apiDomain + 'api/register'
//----------------------------------------------------
//-------------------CATEGORY-------------------------
export const categoryUrl = apiDomain + 'api/category'
export const addParent = apiDomain + 'api/addParent'
//--------------------main page---------------------------------
export const categoryParentUrl = apiDomain + 'api/categoryParent'
export const categoryRandomUrl = apiDomain + 'api/categoryRandom'
export const productRandomUrl = apiDomain + 'api/productRandom'

//----------------------------------------------------
//-------------------PRODUCT-------------------------
export const productUrl = apiDomain + 'api/product'
//-------------------ATTRIBUTE-------------------------
export const attributeUrl = apiDomain + 'api/attribute'
//-------------------VALUE-------------------------
export const valueUrl = apiDomain + 'api/value'
//----------------ATTRIBUTE-VALUE-------------------------
export const attributeValueUrl = apiDomain + 'api/attributeValue'

//----------------BLENDATTRIBUTEVALUE-------------------------
export const blendAttributeValueUrl = apiDomain + 'api/blendAttributeValue'

//-------------------STATUS-PRODUCT-----------------------
export const statusProductUrl = apiDomain + 'api/statusProduct'

//-------------------CHARACTERISTIC-----------------------
export const characteristicUrl = apiDomain + 'api/characteristic'

//-------------------FILE-----------------------
export const fileUrl = apiDomain + 'api/file'
export const fileByProductIdUrl = apiDomain + 'api/file/byProductId'


//----------------------------Main page-------------------------------
//-------------------------product detail-----------------------------
export const fileOfProductUrl = apiDomain + 'api/fileOfProduct'
export const ProductDetailUrl = apiDomain + 'api/productDetail'

/** 
 * page categories
*/
export const childCategoryUrl = apiDomain + 'api/getchildCategory'

/**
 * page SEARCH
 */
export const childPerCategoryUrl = apiDomain + 'api/getchildCategoryById'
export const relatedProductbyCategoryUrl = apiDomain + 'api/getRelatedProductbyCategoryId'
export const relatedProductAndCategorybySearch = apiDomain + 'api/getRelatedProductAndCategorybySearch'


/**
 * imagen no disponible en firebase
 */
export const  imagenNoDisponibleUrl = 'https://firebasestorage.googleapis.com/v0/b/trovare-f9aac.appspot.com/o/imagen-no-disponible.png?alt=media&token=8dc7ab39-b9a0-44e7-9981-76e7d994479a'


/**
 * carrito main page
 */
export const pedidoUrl = apiDomain + 'api/pedido'
export const pedidoByUserIdUrl = apiDomain + 'api/pedidoByUserId'
export const carritoUrl = apiDomain + 'api/carrito'

//-----------------direction--------------------
export const directionUrl = apiDomain + 'api/direction'

//----------------------------------------------------
export const getHeader = function (){
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers ={
    'accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.access_token
  }
return headers;
};
