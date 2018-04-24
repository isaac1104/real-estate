import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';
import propertyDataReducer from './property_data_reducer';
import propertyImgDataReducer from './property_img_data_reducer';
import mapDataReducer from './map_data_reducer';
import UserPropertiesReducer from './user_properties_reducer';
const rootReducer = combineReducers({
  userProperties: UserPropertiesReducer,
  currentUser: currentUserReducer,
  propData: propertyDataReducer,
  imgData: propertyImgDataReducer,
  mapData: mapDataReducer,
  form: formReducer
});

export default rootReducer;
