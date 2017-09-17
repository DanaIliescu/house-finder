export var getMatrixData = (parameter, matrixData) => {
  var value = "";
  for (var i = 0; i < matrixData.length; i++) {
    if(parameter == matrixData[i].label){
      value = matrixData[i].value;
      break;
    } else {
      value = "Ikke oplyst";
    }
  }
  return value;
}

export var getPictureHref = (link) => {
  var href = ""
  if (link) {
    href = link.href;
  } else {
    href = "http://sdst.dk/onewebstatic/543a05bfae-billede-mangler-lille_53.jpg";
  }
  return href;
}
