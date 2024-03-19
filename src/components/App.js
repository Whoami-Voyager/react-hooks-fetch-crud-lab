import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  function newQuestionForm(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newQuestion)
    })
      .then(r => r.json())
      .then(data => {
        const addNewQuestion = [...questions, data]
        setQuestions(addNewQuestion)
      })
  }

  function deleteQuestion(id) {
    const url = (`http://localhost:4000/questions/${id}`)
    fetch(url, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(data=>{
      const deletedQuestion = questions.filter((question) => question.id !== id)
      setQuestions(deletedQuestion)
    })
  }

  console.log(questions)
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm questions={questions} newQuestionForm={newQuestionForm} /> :
        <QuestionList questions={questions} setQuestions={setQuestions} deleteQuestion={deleteQuestion} />}
    </main>
  );
}

export default App;
