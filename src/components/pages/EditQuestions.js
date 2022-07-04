import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { useQuestionsData } from '../../hooks/useEditData';
import PageNotFound from '../helpers/PageNotFound';
import LeftBar from '../layout/LeftBar';
import { Loader } from '../helpers/Loader';
import './Questions.css';
import axios from 'axios';
import HeaderLog from '../layout/HeaderLog';



function EditQuestions() {
  const navigate = useNavigate()
  const [text, setText] = useState()
  const [type, setType] = useState('text')
  const { questionsId } = useParams()
  const { isLoading, data, isError, error, refetch } = useQuestionsData(questionsId)

  const queryClient = useQueryClient()
  const addQuestion = useMutation(
    async (questionData) => {
      console.log(questionData)
      await axios({
        method: 'PUT',
        url: `https://strapi-internship-hr-app.onrender.com/api/questions/${questionsId}`,
        data: {
          data: {
            text: questionData.text,
            type: questionData.type,
            order: 5020
          }
        }
      });
    },
    {
      onMutate: (newData) => {
        console.log(newData)
      },
      onSettled: (data) => {
        queryClient.invalidateQueries('questions')
        refetch()
      },
    }
  );
  const handleSubmit = async (event) => {
    event.preventDefault()
    await addQuestion.mutateAsync({
      text,
      type,
    })
    navigate('/questions')

  }
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <PageNotFound />
  }

  return (
    <div>
      <HeaderLog />
      <div className="left-bar-companyinfo">
        <LeftBar />
        <div className="container-edit">
          <h2 className="title-add-new">Edit Questions</h2>
          <form className="form-add-new" onSubmit={handleSubmit}>
            <label className="title-questions-text">Questions text:</label>
            <input
              className="input-add-text"
              type="text"
              required
              placeholder={data?.data.data.attributes.text}
              onChange={(event) => setText(event.target.value)}
            />
            <p className="title-questions-text">Questions type</p>
            <select
              className="section-options"
              value={data?.data.data.attributes.type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value='text'>Text</option>
              <option value='long_text'>Long text</option>
              <option value='image'>Image</option>
            </select>
            <div className="btn-save-right">
              <button className="btn-save-add-new button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditQuestions