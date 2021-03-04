import React from 'react';
import MenuItem from '../menu-item/menu-item.component.jsx'
import './directory.style.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({directorySections}) => (
  <div className='directory-menu'>
    {
      directorySections.map(({id, ...allOtherProps}) => (
        <MenuItem key={id} {...allOtherProps}/>
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  directorySections : selectDirectorySections
});

export default connect(mapStateToProps)(Directory);