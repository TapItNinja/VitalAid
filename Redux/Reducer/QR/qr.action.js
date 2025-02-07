// Redux/Reducer/QR/qr.action.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QRActionTypes } from './qr.types';

export const fetchMenuStart = () => ({
  type: QRActionTypes.FETCH_MENU_START,
});

export const fetchMenuSuccess = (menu) => ({
  type: QRActionTypes.FETCH_MENU_SUCCESS,
  payload: menu,
});

export const fetchMenuFailure = (error) => ({
  type: QRActionTypes.FETCH_MENU_FAILURE,
  payload: error,
});

export const fetchMenuAsync = (restaurantId) => async (dispatch) => {
  try {
    dispatch(fetchMenuStart());
    const jwtToken = await AsyncStorage.getItem('token');

    // Fetch categories
    const categoriesResponse = await fetch(
      `http://api.swiftdine.rest/api/categories/${restaurantId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const categoriesData = await categoriesResponse.json();
    
    // Create categories map
    const categoriesMap = {};
    if (categoriesData && categoriesData.categories) {
      categoriesData.categories.forEach(category => {
        const [name, id] = category;
        categoriesMap[id] = name;
      });
    }

    // Fetch menu items
    const menuResponse = await fetch(
      `http://api.swiftdine.rest/api/menu/${restaurantId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const menuData = await menuResponse.json();

    if (!menuResponse.ok) {
      throw new Error(menuData.message || 'Failed to fetch the menu');
    }

    // Organize menu items by category
    const categorizedMenu = {};
    menuData.menu.forEach(item => {
      const [menuItemId, categoryId, name, description, price, imageUrl, isAvailable, isVeg] = item;
      const categoryName = categoriesMap[categoryId] || 'Other';
      
      if (!categorizedMenu[categoryName]) {
        categorizedMenu[categoryName] = [];
      }

      categorizedMenu[categoryName].push({
        id: menuItemId,
        categoryId,
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        isAvailable: Boolean(isAvailable),
        isVeg: Boolean(isVeg),
        rating: 4.5,
        bestSeller: false
      });
    });

    // Save to AsyncStorage
    await AsyncStorage.setItem('categorizedMenu', JSON.stringify(categorizedMenu));
    await AsyncStorage.setItem('restaurantId', restaurantId);
    
    dispatch(fetchMenuSuccess(categorizedMenu));
    return categorizedMenu;

  } catch (error) {
    dispatch(fetchMenuFailure(error.message));
    throw error;
  }
};