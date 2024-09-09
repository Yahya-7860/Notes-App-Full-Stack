const { noteModel } = require("../model");
const parseString = require("xml2js").parseString;

const handleAddNote = async (req, res) => {
  //! mannually converting string into json like format for text and javascript type
  // var reqBody = req.body;
  // var data = {};
  // var lines = reqBody.split("\n");
  // lines.forEach((line) => {
  //   var [key, value] = line.split("=");
  //   data[key.trim()] = value.trim();
  // });
  // const { title, content } = JSON.parse(req.body);

  //! parsing HTML body manually
  // var rawData = req.body;
  // const titleMatch = rawData.match(/<title>(.*)<\/title>/);
  // const contentMatch = rawData.match(/<content>(.*)<\/content>/);
  // const title = titleMatch[1];
  // const content = contentMatch[1];

  //! manually parsing xml data into js format using additional library name xml2js
  // var xmlData = req.body;
  // var parsedXMLdata = {};
  // parseString(xmlData, (error, result) => {
  //   if (result) parsedXMLdata = result;
  //   else console.log(error);
  // });
  // const { title, content } = parsedXMLdata.note; //title and content is array

  // console.log(req);
  // return res.status(400).send("wip");

  const { title, content } = req.body;
  if (!title || title === "")
    return res.status(400).json({ message: "title cannot be empty" });
  try {
    const note = await noteModel.create({
      title,
      content,
    });
    res.status(200).json({ message: "Note added succesfully", note });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const handleGetNotes = async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteNote = async (req, res) => {
  var title = req.query.title;
  if (title) {
    try {
      await noteModel.findOneAndDelete(title);
      res.send("Document Deleted Successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.status(404).send("Please provide title");
  }
};

const handleUpdateNote = async (req, res) => {
  var title = req.query.title;
  var content = req.query.newcontent;

  if (title && content) {
    try {
      await noteModel.findOneAndUpdate({ title: title }, { content: content });
      res.send("Document updated Successfully");
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.status(404).send("Please provide title and newcontent both");
  }
};

module.exports = {
  handleAddNote,
  handleGetNotes,
  handleDeleteNote,
  handleUpdateNote,
};
