//currently when html is run says Conway is not defined
const conway = new Conway("noteField")

const noteField = document.getElementById("noteField")

let runThread;

conway.drawgrid();
conway.initCanvas();

$("#playButton").click(conway.startgame.bind(conway));
$("#stopButton").click(conway.endgame.bind(conway));
$("#resetButton").click(conway.resetboard.bind(conway));