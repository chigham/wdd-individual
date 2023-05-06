import U, {printName as printUserName, printAge} from "./export-User.js";

const user = new U("Bob", 12);
printAge(user);
printUserName(user);