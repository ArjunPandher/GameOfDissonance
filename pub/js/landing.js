//currently when html is run says Conway is not defined
//const conway = Conway("noteField")

const noteField = document.getElementById("noteField")

//conway.drawgrid();
let gridwidth = 2;
let cellwidth = 20;
let cellheight = 20;
let ctx = noteField.getContext("2d")
ctx.strokeStyle = "#B6E6EC";
ctx.lineWidth = 2;
for (let i = 0; i < noteField.height; i += gridwidth + cellwidth) {
    ctx.moveTo(0, i);
    ctx.lineTo(noteField.width, i);
    ctx.stroke();
}
for (let i = 0; i < noteField.width; i += gridwidth + cellheight) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, noteField.height);
    ctx.stroke();
}
