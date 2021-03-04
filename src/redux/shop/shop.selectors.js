import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector (
  [selectShop],
  (shop) => shop.collections
);

//as we have converted our SHOP_DATA into an object
//the collection-component collections.map will not work anymore when passing the collection to preview component
//instead, we convert the keys of the collections into an array
//map over them, and return an array of collections
export const selectCollectionsForPreview = createSelector (
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)



//this is a crude way, but just to show
//basically get the id from collection_id_map by selecting the collection and returning the collection with the id mapping
//it is also not momized due to collectionUrlParam is passed can be dynamic
//it therefore always return a new instance of selector.
//it will trigger rerender as mapStateToProps will check and assume it is new changes
//to avoid this, one way is to use the memoize help function in the lodash library: npm install lodash.memoize
//we import it here, and then wrap the whole function with memoize((collectionUrlParam) => ...)
// export const selectCollection = memoize(collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
//   ));



  //another problem with find, is that with Array, this will search from left to right for the whole array
  //and if the collections is say 100000, and the collection we are interested in is actually at last,
  //it will iterate through all those before.

  //instead, we can store each collection data within an object, and within a master object
  //for each of the collection we then give a UID, here we just use a text

  //this "normalised" the data as it is not in an array of collections anymore
  //instead, it is just one big nested object of collections data
  //so instead of iterating through index in an array, we just match the UID in this single object;
  //so we don't need separate mapping anymore, and we can simply this as :

export const selectCollection = (collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  ));
//i.e. it just access the properties in the collections object with the property key matching the collectionUrlParam text

//note that the items are still in array, which we simply iterate and display them as collection-item
//however, if want to access the individual item itself from all the items
//then it will makes sense to do similar things and put them as object and access through id