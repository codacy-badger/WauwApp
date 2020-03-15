import { db } from "../population/config.js";

const changeAvatar = () => {
  console.log("Estás cambiando el avatar...");
};

export async function updateName(id, name) {
  let userData = {
    name: name
  };
  db.ref("wauwers")
    .child(id)
    .update(userData);
}

const updateSurname = surName => {
  let userData = {
    surName: surName
  };
  db.ref("wauwers")
    .child(userInfo.id)
    .update(userData);
};

const updateDescription = desc => {
  let userData = {
    description: desc
  };
  db.ref("wauwers")
    .child(userInfo.id)
    .update(userData);
};
