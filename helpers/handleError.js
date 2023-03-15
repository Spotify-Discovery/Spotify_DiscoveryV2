module.exports.handleError = (error, req, res, next) => {
  console.log(error)
  let status = error.response ? error.response.status : 200;
  if (status === 401 || status === 403) {
    res.status(status).send();
  } else {
    res.status(500).send('Spotify responded with a status ' + error.response.status);
  }

  next();
}