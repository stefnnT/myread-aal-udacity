const debounce = (callback, wait) => {
  let timerId;

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback();
    }, wait);
  };
};

export default debounce;
