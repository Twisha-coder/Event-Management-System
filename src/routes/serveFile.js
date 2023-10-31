const sendFile = (req, res, fileName) => {
  const options = {
    root: "pages",
    dotfiles: "deny",
  };

  res.sendFile(fileName, options, (err) => {
    if (err) return console.log(err.message);
    console.log("File Served !!!");
  });
};

module.exports = sendFile;
