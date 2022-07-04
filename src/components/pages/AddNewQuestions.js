import axios from 'axios';
import React , {useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import './AddNewQuestions.css';
import { useNavigate } from 'react-router';



function AddNewQuestions() {
  let navigate = useNavigate();
  const queryClient = useQueryClient()
  const [ text , setText] = useState('');
  const [ type , setType] = useState('text');

  const fetchQuestions = () => {
    return axios.get('https://strapi-internship-hr-app.onrender.com/api/questions?sort=order:DESC')
}
  const addQuestionsData = (quest) => {
    return axios.post('https://strapi-internship-hr-app.onrender.com/api/questions', quest)
  }
  const {data, isLoading, isError, error, refetch} = useQuery('questions', fetchQuestions)
  const lastOrder = data?.data.data[0]?.attributes.order
  const addQuestion = useMutation(
    async (questionData) => {
      await axios({
        method: 'POST',
        url: `https://strapi-internship-hr-app.onrender.com/api/questions`,
        data: {
          data:{
          text: questionData.text,
          type: questionData.type,
          order: lastOrder + 1
          }
        }
      });
    },
    {
      onMutate: (newData) => {
        console.log(newData)
      },
      onSettled: (data) => {
        // queryClient.invalidateQueries('questions')
        refetch()
      },
    }
  );
  const {data: questionData, mutate:quest} = useMutation(addQuestionsData)
  const handleSubmit = async(event) => {
    event.preventDefault()
    await addQuestion.mutateAsync({
      text,
      type 
    })
    navigate('/questions')
  }

  return (
    <div>
      <HeaderLog />
            <div className="questions-add">
                <LeftBar />
                <div className="create">
                  <h2 className="title-add-new">Add new Questions</h2>
                  <form className="form-add-new" onSubmit={handleSubmit}>
                        <label className="title-questions-text">Questions text:</label>
                          <input
                          className= "input-add-text" 
                          type="text" 
                          required
                          value={text}
                          onChange={(event)=>setText(event.target.value)}
                          />
                          <p className="title-questions-text">Questions type</p>
                        <select 
                        className="section-options"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        >
                          <option value='text'>Text</option>
                          <option value='long_text'>Long text</option>
                          <option value='image'>Image</option>
                        </select>
                        <div className="btn-save-right">
                        <button className="btn-save-add-new button">Save</button>
                        </div>
                  </form>
                </div> 
            </div>
    </div>
  )
}

export default AddNewQuestions























// import React , { useEffect, useState } from 'react';
// import HeaderLog from '../layout/HeaderLog';
// import LeftBar from '../layout/LeftBar';
// import './AddNewQuestions.css';

// function AddNewQuestions() {
//   const [ title , setTitle] = useState('');
//   const [ body , setBody] = useState('');
//   const  [ id, setId ] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   }

//   return (
//     <div>
//       <HeaderLog />
//         <div className="questions-add">
//           <LeftBar />
//           <div className="create">
//             <h2 className="title-add-new">Add new Questions</h2>
//             <form className="form-add-new" onSubmit={handleSubmit}>
//                 <label className="title-questions-text">Questions text:</label>
//                   <input
//                     className= "input-add-text" 
//                     type="text" 
//                     required
//                     key={id}
//                     value={title}
//                     onChange={(e)=>
//                       setTitle(e.target.value)}
//                   />

//                   <p className="title-questions-text">Questions type</p>
                  
//                   <select 
//                     className="section-options"
//                     value={body}
//                     onChange={(e) => 
//                       setBody(e.target.value)}
//                   >
//                     <option value='Text'>Text</option>
//                     <option value='Long text'>Long text</option>
//                     <option value='Image'>Image</option>
//                   </select>

//                 <div className="btn-save-right">
//                   <button className="btn-save-add-new">
//                     Save
//                   </button>
//                 </div>
//             </form>
//           </div> 
//         </div>
//     </div>
//   )
// }

// export default AddNewQuestions









































// // import React from 'react';
// // import './Questions.css';

// // function QuestionsItem() {
// //   return (
// //   <div className='questions-field'>
// //       <div className='arrows'>
// //           <img className='arr-up'>

// //           </img>
// //           <img className='arr-down'>
              
// //           </img>
// //       </div>

// //       <div className='text'>
// //         <p>Question 1 - Text</p> {/* ovde treba uraditi set za promenu broja pitanja i set za promenu naziva texta  */}
// //         <h3>Do You have any pets</h3>  {/* ovde treba uraditi set za edit texta  */}
// //       </div>

// //       <div className='buttons'>
// //           <button>
// //             Edit
// //           </button>
// //           <button>
// //             Delete
// //           </button>
// //       </div>
// //   </div>
// // )}

// // export default QuestionsItem;
