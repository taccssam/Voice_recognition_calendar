import { getToDoDate, getToDoText } from "./speechSplit";

export const todoIns = (te) => {
  
  let obj = getToDoDate(te);
  let TODOS_LS = obj[1];
  let dt = obj[0];
    console.log(obj);
    let text = getToDoText(te,dt);
  
    let loadToDo = [],newId;
  
    let loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
        loadToDo.push(toDo);
      });
      newId = loadedToDos.length + 1;
    }
    if (loadedToDos == null) {
      newId = 1;
    }
  
    let toDoObj = {
      text: text,
      id: newId,
    };
  
    loadToDo.push(toDoObj);
    localStorage.setItem(TODOS_LS, JSON.stringify(loadToDo));
  }