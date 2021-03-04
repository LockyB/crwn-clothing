import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CategoryPage from '../collection/collection.component';

//Route has props match, location and history
//we use match to use the path
//the :categoryId is a special syntax in Route that specify parameters which is the url params
//CategoryPage can then access this variable via match.params.categoryId to obtain the actual param val.

const ShopPage = ({ match }) => (
  <div className ='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path = {`${match.path}/:collectionId`} component={CategoryPage}/>
  </div>
);

export default ShopPage;