import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addPost } from "../reducers/post";
import { initMic } from "../Speech/micSet";
import { ret, recognition,clearRet } from "../Speech/speechStart";
import { UpdateSpeech } from "../Speech/speechAction";
import { quickStart } from "../Speech/Text2Speech";

var googleTTS = require('google-tts-api');

const TodoForm = () => {
  
  const [dos, setDos] = useState("");
  const dispatch = useDispatch();

  const onChangeDo = useCallback((e) => {
      setDos(e.target.value);
    }, []);

  recognition.onend = () => {
    setDos(ret);
    };

  const onSubmit = useCallback(() => {
    console.log(ret);
    //dispatch(addPost);
    quickStart(ret);
    UpdateSpeech(ret);
    clearRet();
    setDos("");
  }, []);

  return (
    <Form onFinish={onSubmit}>
      <div>
        <label htmlFor="dos">할 일</label>
        <br />
        <Input name="dos" value={ret} onChange={onChangeDo} required />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          추가
        </Button>
        <Button type="primary" onClick={initMic} loading={false}>
          입력
        </Button>
      </div>
    </Form>
  );
};

export default TodoForm;
