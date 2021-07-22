function setInstrument(inst) {
    const d = new Date();
    d.setTime(d.getTime() + (3650*24*60*60*1000)); // 10 years ahead
    let expires = "expires="+ d.toUTCString();
    document.cookie = "instrument=" + inst + ";" + expires + ";path=/";
    setSelectedInstrument(inst);
    load();
  }

  function getInstrument() {
    let name = "instrument=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "Piano";
  }

  function setSelectedInstrument(inst) {
    document.getElementById("selectInstrumentPiano").classList.remove("selected");
    document.getElementById("selectInstrumentTrumpet").classList.remove("selected");
    document.getElementById("selectInstrumentAltosax").classList.remove("selected");
    document.getElementById("selectInstrument"+inst).classList.add("selected");
  }