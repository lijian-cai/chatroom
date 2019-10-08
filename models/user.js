const Avatar = require('avatar-builder');
const fs = require('fs');
const path = require('path');
const AVATAR_SIZE = 40;

class User {
  //构造方法
  constructor(name) {
    this.name = name;
    this.generateAvatar(name)
  }

  //类中的方法
  generateAvatar(name){
    const catAvatar = Avatar.catBuilder(AVATAR_SIZE);
    catAvatar.create(name).then(buffer => fs.writeFileSync(path.resolve(`./public/images/${name}.png`), buffer));
  }
}
module.exports = User