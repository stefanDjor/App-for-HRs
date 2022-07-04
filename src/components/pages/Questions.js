import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderLog from '../layout/HeaderLog';
import LeftBar from '../layout/LeftBar';
import '../pages/Questions.css'
import { Loader } from '../helpers/Loader';
import PageNotFound from '../helpers/PageNotFound';
import { useMutation, useQuery} from "react-query";


const fetchPostmanQuestions = () => {
    return axios
            .get('https://strapi-internship-hr-app.onrender.com/api/questions?populate=*&pagination[pageSize]=1000')
}

const deleteQuestions = async(id) => {
    await axios
            .delete(`https://strapi-internship-hr-app.onrender.com/api/questions/${id}`)    
}

    export const Questions = () => {

        let i = 1;

        const { isLoading, 
                data:questions, 
                error, 
                refetch } = useQuery(
                                        'questions', 
                                        fetchPostmanQuestions, 
                                            {
                                                refetchOnWindowFocus: true
                                            })

        const { mutateAsync:deletequestions } = useMutation(async(id) => { 
            await deleteQuestions(id)},
                {
                onSuccess:(data) => {
                    // console.log(data)
                    refetch()
                }
            }
        )

        if (isLoading) {
            return <Loader />
            } 
        if (error) {
            return <div>
                        <PageNotFound />
                    </div>
            }

        return (
            <div>
                <HeaderLog />
                <div className="questions-container">
                    <LeftBar />
            
                    <div className="questions-right-side">
                        <div className="title-btn">
                            <h2 className="questions-title-big">Questions</h2>
                            <Link  to="/addquestions">
                                <button className="add-team">
                                        + Add new questions
                                </button>
                            </Link>
                        </div>

                        { questions?.data.data.map((quest) => (
                        <div className="questions-place" key={quest.id}>
                            <div className="questions-place-left">
                                <div className="questions-place-start">
                                    <h3 className="questions-title">Questions {i++} -</h3>
                                        <p className="questions-p"> {quest.attributes?.type}</p>  
                                </div>
                                <div className='sa'>
                                    <p className="questions-p">{quest.attributes?.text}</p> 
                                </div> 
                            </div>

                            <div className="questions-place-right">
                                <Link to={`/questions/${quest.id}/edit`}>
                                    <button className="btn-edit btn button">
                                        Edit
                                    </button>
                                </Link>

                                <button className="btn-delete btn button" 
                                    onClick={async() => await deletequestions(quest.id)}
                                >
                                    Delete
                                </button>
                            </div>                        
                        </div>                                            
                    ))}
                    </div>  
                </div>
            </div>


        )
    }

//     const [posts, setPosts] = useState([])
//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(false)
    
//     useEffect(() => {
//         axios.get('https://strapi-internship-hr-app.onrender.com/api/questions?populate=*')
//         .then(res => {
//             setPosts(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }, [posts])

//     const handleClick = (id) => {
//         setLoader(true)
//         axios.delete(`https://strapi-internship-hr-app.onrender.com/api/questions/${id}` , {
//             data: {...posts} 
//         }).then((res) => {
//             setLoader(false)
//         })
//     }
    
//   return (
//       <div>
//       <HeaderLog />
//             <div className="questions-container">
//                 <LeftBar />
                
//                 <div className="questions-right-side">
//                     <div className="title-btn">
//                         <h2 className="questions-title-big">Questions</h2>
//                         <Link  to="/addquestions">
//                             <button className="add-questions button"> + Add new questions</button>
//                         </Link>
//                     </div>

//                     {loader && <div className='spinner-questions'>
//                         <Loader />
//                     </div>}
//                     {posts.data?.map((quest) => (

//                         <div className="questions-place" key={quest.id}>
//                             <div className="questions-place-left">
//                                 <div className="questions-place-start">
//                                 <h3 className="questions-title">Questions {i++} -</h3>
//                                 <p className="questions-p"> {quest.attributes?.type}</p>  
//                                 </div>
//                                 <div className='sa'>
//                                 <p className="questions-p">{quest.attributes?.text}</p> 
//                                 </div> 
//                             </div>
//                             <div className="questions-place-right">
//                                 <button className="btn-edit btn button">Edit</button>
//                                 <button className="btn-delete btn button" 
//                                     onClick={()=>handleClick(quest.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </div>

//                         </div>
                    
//                     ))}
//                 </div>  
//             </div>
//     </div>
//   )
// }



































// import { useQuery} from "react-query";
// import axios from "axios";
// import {Link} from 'react-router-dom'
// import HeaderLog from "../layout/HeaderLog";
// import LeftBar from "../layout/LeftBar";
// import { Loader } from '../helpers/Loader';
// import PageNotFound from "../helpers/PageNotFound";


// const fetchPostman = () => {
//     return axios.get('https://strapi-internship-hr-app.onrender.com/api/questions?populate=*&pagination[pageSize]=1000')
// }
 

// export const Questions = () => {
//     let i= 1;
//     const {isLoading , data:questions, error } = useQuery('questions', fetchPostman, {
//         refetchIntervalInBackground: true,
//     }
//     )
//     if(isLoading) {
//         return <Loader />
//     }
//     if(error){
//         return <div className="error-message">
//             <div className="error-place">
//                 <Link to="*">
//                     <PageNotFound/>
//                 </Link>
//             </div>
//         </div>
//     }
//     return (
//         <div>
//             <HeaderLog />
//             <div className="questions-container">
//                 <LeftBar />
//                 <div className="questions-right-side">
//                     <div className="title-btn">
//                         <h2 className="questions-title-big">Questions</h2>
//                         <Link  to="/addquestions">
//                             <button className="add-questions button"> + Add new questions</button>
//                         </Link>    
//                     </div>
//                     {questions?.data.data.map((quest) => (
//                         <div className="questions-place" key={quest.id}>
//                             <div className="questions-place-left">
//                                 <div className="questions-place-start">
//                                 <h3 className="questions-title">Questions {i++} -</h3>
//                                 <p className="questions-p"> {quest.attributes?.type}</p>  
//                                 </div>
//                                 <div className='sa'>
//                                 <p className="questions-p">{quest.attributes?.text}</p> 
//                                 </div> 
//                             </div>
//                             <div className="questions-place-right">
//                                 <Link to={`/questions/${quest.id}/edit`}>
//                                 <button className="btn-edit btn button">Edit</button>
//                                 </Link>
//                                 <button  className="btn-delete btn button">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div> 
           
//             </div>
//         </div>
//     )
// }
