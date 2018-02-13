function handleOriginForm(req, res, next) {
  let origin = req.body.origin;
  let originIndex = Number(req.body.originIndex);
  req.session.origin = origin;
  let possibleDestinations = [];

  function objContainsAnyItemOfArr(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
      if (obj[arr[i]] !== undefined) {
        return true;
      }
    }
    return false;
  }
  for (let i = 0; i < req.session.commuterRail.length; i++) {
    if (i !== originIndex && objContainsAnyItemOfArr(req.session.commuterRail[i].line, req.session.commuterRail[originIndex].linesObj)) {
      possibleDestinations.push(req.session.commuterRail[i]);
    }
  }
  req.session.possibleDestinations = possibleDestinations;
  next();
}

function handleSelectDestination(req, res, next) {
  if (req.session.possibleDestinations === undefined) {
    res.redirect('/mbta/select-origin');
  } else {
    next();
  }
}

function handleDestinationForm(req, res, next) {
  req.session.destination = req.body.destination;
  next();
}

function handleViewTicketConfirmation(req, res, next) {
  if (req.session.destination === undefined) {
    res.redirect('/mbta/select-destination');
  } else {
    next();
  }
}

module.exports = {
  handleOriginForm,
  handleSelectDestination,
  handleDestinationForm,
  handleViewTicketConfirmation,
};