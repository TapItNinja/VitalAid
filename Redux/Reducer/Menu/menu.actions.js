import AsyncStorage from '@react-native-async-storage/async-storage';
import { MENU_LOADING, MENU_SUCCESS, MENU_ERROR } from './menu.types';

export const fetchMenu = () => async dispatch => {
  dispatch({ type: MENU_LOADING });
  try {
    const storedMenu = await AsyncStorage.getItem('categorizedMenu');
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
      dispatch({
        type: MENU_SUCCESS,
        payload: parsedMenu
      });
      return parsedMenu;
    }
    throw new Error('No menu data found');
  } catch (error) {
    dispatch({
      type: MENU_ERROR,
      payload: error.message
    });
  }
};