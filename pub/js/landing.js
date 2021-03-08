//currently when html is run says Conway is not defined
const conway = new Conway("noteField")

const noteField = document.getElementById("noteField")

conway.drawgrid();

conway.updatecell(3, 2);