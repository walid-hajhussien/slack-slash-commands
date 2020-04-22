const fs = require("fs");

const saveNotes = notes => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
};

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const notes = bufferData.toString();
    return JSON.parse(notes);
  } catch (error) {
    return {};
  }
};

const addNote = (user, message) => {
  const notes = loadNotes();
  const date = getDate();
  if (!notes[date]) {
    notes[date] = [];
  }
  notes[date].push([user, message]);
  saveNotes(notes);
};

const clear = password => {
  if (password != "123456789") {
    return;
  }
  const notes = loadNotes();

  const date = getDate();

  notes[date] = [];
  saveNotes(notes);
};

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return today;
};

// message section

// load messages
const loadMessages = () => {
  try {
    const bufferData = fs.readFileSync("messages.json");
    const notes = bufferData.toString();
    return JSON.parse(notes);
  } catch (error) {
    return {};
  }
};

//save Message
const saveMessage = messages => {
  const messagesJson = JSON.stringify(messages);
  fs.writeFileSync("messages.json", messagesJson);
};

// clear messages
const clearMessages = password => {
  if (password != "ozil123") {
    return;
  }
  const messages = loadNotes();

  const date = getDate();

  messages[date] = [];
  saveMessage(messages);
};

// add messages
const addMessages = (username, text, roomname) => {
  const messages = loadMessages();
  const date = getDate();
  if (!messages[date]) {
    messages[date] = [];
  }

  let message = {
    username: username,
    text: text,
    roomname: roomname
  };

  messages[date].push(message);
  saveMessage(messages);
};

module.exports = {
  saveNotes: saveNotes,
  loadNotes: loadNotes,
  addNote: addNote,
  getDate: getDate,
  clear: clear,
  addMessages: addMessages,
  loadMessages: loadMessages,
  clearMessages: clearMessages
};
