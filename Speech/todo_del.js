import { getToDoDate, getToDoText } from "./speechSplit";

export const todoDel = (te) => {
  let obj = getToDoDate(te);
  let TODOS_LS = obj[1];
  let dt = obj[0];
    
  let text = getToDoText(te,dt);
  
  let loadedToDos = localStorage.getItem(TODOS_LS);
  let parsedToDos;
  
  if (loadedToDos !== null) {
     parsedToDos = JSON.parse(loadedToDos);
     parsedToDos = parsedToDos.filter( toDo =>toDo.text !== text);
  }
  console.log(parsedToDos);
    localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));
  }