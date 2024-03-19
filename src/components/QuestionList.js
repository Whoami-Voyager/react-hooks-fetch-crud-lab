import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions, deleteQuestion }) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => {
        setQuestions(data)
      })
  }, [])

  const questionList = questions.map((unknown) => {
    return <QuestionItem question={unknown} key={unknown.id} deleteQuestion={deleteQuestion}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
