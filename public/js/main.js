let typed = null;
let pathText = ""

document.addEventListener("DOMContentLoaded", function () {
  typed = new Typed("#hover-path", {
    strings: [""],
    typeSpeed: 10,
    showCursor: false
  });
  registerATags();
});

let fillCmdPath = (event) => {
  if (event.path[0].attributes.navlink) {
    pathText = "cd " + event.target.text;
  } else {
    pathText = "xdg-open " + event.path[0].href;
  }
  typed.reset();
  typed.strings = [pathText];
  typed.start();
}

let clearCmdPath = () => {
  typed.reset();
  typed.strings = [""];
  typed.stop();
}

let registerATags = () => {
  Array.from(document.getElementsByTagName("a")).forEach((elem) => {
    elem.onmouseenter = fillCmdPath;
    elem.onmouseleave = clearCmdPath;
  });
}