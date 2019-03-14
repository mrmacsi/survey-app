module.exports = (req, res, next) => {
  if (req.user.credits<1) {
    return res.status(403).send({ error: "Not Enough credits!" });
  }
  next();//continue what else you are doing
};
