let users = [];
function joinUser(socketId, userName, roomName) {
  const user = {
    socketID: socketId,
    username: userName,
    roomname: roomName
  }
  users.push(user)
  return user;
}

function getRoom(id) {
  let user = users.find(item => {
    return item.socketID === id
  })
  if (user) {
    return user.roomname
  }
}

function getUsername(id) {
  let user = users.find(item => {
    return item.socketID === id
  })
  if (user) {
    return user.username
  }
}

function removeUser(id) {
  const getID = users => users.socketID === id;
  const index = users.findIndex(getID);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
module.exports = { joinUser, removeUser, getRoom, getUsername }