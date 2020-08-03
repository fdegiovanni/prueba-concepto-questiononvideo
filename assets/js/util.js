const getRandomColor = () => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    randomColor = ( randomColor.length === 6) ? randomColor : randomColor.padEnd(6, "0");
    return "#" + randomColor;
  }