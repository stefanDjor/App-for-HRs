import { useQuery } from "react-query";
import axios from "axios";

const fetchQuestionsData = (questionsId) => {
    return axios.get(`https://strapi-internship-hr-app.onrender.com/api/questions/${questionsId}`)
}

export const useQuestionsData = (questionsId) => {
    // const queryClient = useQueryClient()
    return useQuery(['questions', questionsId], () =>
        fetchQuestionsData(questionsId))
}
