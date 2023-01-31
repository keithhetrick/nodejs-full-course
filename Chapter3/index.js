const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(
  "\nFORMATTED DATE & TIME: ",
  format(new Date(), "yyyy-MM-dd\tHH:mm:ss")
);

console.log("\nUUID: ", uuid());
