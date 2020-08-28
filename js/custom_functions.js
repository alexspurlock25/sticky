// source: https://stackoverflow.com/a/30391004/11262704

// function to toggle between two functions
let toggleTwoFunctions = function (function1, function2) {
  var toggle = false;
  return function () {
    return (toggle = !toggle) ? function1() : function2();
  };
};
