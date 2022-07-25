export const getLocalData = (key) => {
  if (key) {
    const data = localStorage.getItem(key);
    return data;
  }
};

export const saveLocalData = (key, value) => {
  /* console.log("util",key,value); */
  if (key && value) {
    localStorage.setItem(key, value);
  }
};

export const removeLocalData = () => {
  /* console.log("util",key,value); */
 
    localStorage.setItem("");
  
};
