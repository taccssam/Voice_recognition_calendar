import { console } from "window-or-global";
import { getToDoDate, getToDoText } from "./speechSplit";

export const todoCheck = (te, iscom) => {
    let obj = getToDoDate(te);
    let TODOS_LS = obj[1];
    let dt = obj[0];
      
    let text = getToDoText(te,dt);
    
    let loadedToDos = localStorage.getItem(TODOS_LS);
    let parsedToDos;

    if (loadedToDos !== null) {
        parsedToDos = JSON.parse(loadedToDos);
       
        parsedToDos.forEach(e => {
        if (e.text == text) {
            e.complete = iscom;
        }
       });
    }
    console.log(parsedToDos);
      localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));
    }