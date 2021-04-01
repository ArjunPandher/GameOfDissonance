//currently when html is run says Conway is not defined
const conway = new Conway("noteField")

const noteField = document.getElementById("noteField")

conway.drawgrid();
conway.initCanvas();

conway.updatecell(0, 0)
conway.updatecell(0, 1)
conway.updatecell(1, 0)
conway.updatecell(3, 3)