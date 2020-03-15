import { db } from "../population/config.js";

export const users = [];
db.ref("wauwers").orderByChild("id").on("value", function(snap){
  snap.forEach(function(child){
      users.push(child.val());
  });
});