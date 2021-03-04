import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.style.scss';

const CollectionPage = ({collection}) => {
  const { title, items } = collection;
  return (
  <div className = 'collection-page'>
    <h2 className = 'title'>{title}</h2>
    <div className = 'items'>
      {
        items.map(item=> <CollectionItem key={item.id} item={item} />)
      }
    </div>
  </div>
  )
};

//the mapStateToProps has second optional parameter, which is the props of the component that we wrapping in our connect
//i.e. the own properties in the component before we wrap it with connect
//here, we use the match props
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})
//note that selectCollection is not memoized, because the first param passed in is dynamic
//i.e. mapStateToProps will call a new instance of selectCollection when each time a state changed
//to allow memoize to be used properly, we need to wrap the whole return function with lodash.memoize helper function

//we pass the state to selectCollection, after we pass the match props as this selector
//takes the url param props first before creating the selector using the state
//here we use currying to as selectionCollection(ownProps.match.params.collectionId) returns a function
//which we then apply to state to eval

export default connect(mapStateToProps)(CollectionPage);

