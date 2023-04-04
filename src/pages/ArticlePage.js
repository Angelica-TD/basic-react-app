import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser.js";

const ArticlePage = () =>{
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(()=>{

        const loadArticleInfo = async()=>{
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
        
    }, []);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article){
        return <NotFoundPage />
    }

    return(
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user
                ? <button onClick={addUpvote}>Upvote</button>
                : <Link to='/login'>Log in to upvote</Link>
            }
            
        </div>
        <p>This article has {articleInfo.upvotes} upvote(s) and {articleInfo.pageViews} view(s)</p>
        {article.content.map((paragraph, index) => (
            <p key={index}>{ paragraph }</p>
        ))}

        {user
            ? <AddCommentForm
            articleName={articleId}
            onArticleUpdated={updatedArticle=>setArticleInfo(updatedArticle)} />
            
            : <Link to='/login'>Log in to upvote</Link>
        }
            
        <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage;