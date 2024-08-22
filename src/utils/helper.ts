import Toast from 'react-native-toast-message';

const showError = (title: any, message?: any) => {
    Toast.show({
      type: 'error',
      text1: title ?? 'Error',
      text2: message ?? '',
    });
  };
  const showSuccess = (title: any, message?: any) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  };

  
export {
    showError,
    showSuccess,
  };