export const validateUserName = (userName) => {
    if (!userName || userName.trim() === '') {
      return 'Please enter a user name';
    }
    return '';
  };
  
  export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
      return 'Please enter your email';
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  };
  
  export const validatePassword = (password) => {
    if (!password || password.trim() === '') {
      return 'Please enter a password';
    }
    if (password.length < 7) {
      return 'The password must be 7 characters or longer';
    }
    return '';
  };

  export const validateYearsOfExperience= (yearsOfExperience)=>{
    if (yearsOfExperience === '') {
        return 'Please enter your years of experience'; 
      }
      return '';
  }
  export const validatephoneNumber= (phoneNumber)=>{
  if (phoneNumber === '') {
    return 'Please enter your phone number';
  }
  if (phoneNumber.length != 10 ) {
    return 'The Phone number isnt currect';
  }

  return '';
}
  