
import { todoDel } from "./todo_del";
import { todoIns } from "./todo_ins";

export const UpdateSpeech = (te) => {
    
    te = te.split(" ");
    
    if (
      te[te.length - 2] == "추가해" ||
      te[te.length - 3] == "추가" ||
      te[te.length - 2] == "등록해" ||
      te[te.length - 3] == "등록"
    ) {
     window.alert("일정이 등록되었습니다.");
        todoIns(te);
        console.log("insert");
    }
    if (
      te[te.length - 2] == "삭제해" ||
      te[te.length - 3] == "삭제" ||
      te[te.length - 2] == "지워"
    ) {
      window.alert("일정이 삭제되었습니다.");
        todoDel(te);
        console.log("delete");
    }
    //clearTextContent();
    //init_todo();
    
  }