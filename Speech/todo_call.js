import { console } from "window-or-global";
import { getToDoDate} from "./speechSplit";
import { SpeechText } from "./Text2Speech";

export const todoCall = (te, iscom) => {
    let obj = getToDoDate(te);
    let TODOS_LS = obj[1];
    
    let loadedToDos = localStorage.getItem(TODOS_LS);
    let parsedToDos;

    if (loadedToDos !== null) {
        parsedToDos = JSON.parse(loadedToDos);
       
        parsedToDos.forEach(e => {
            let s = e.text + " 일정";
            SpeechText(s);
       });
    }

    SpeechText("입니다.")
    
    }