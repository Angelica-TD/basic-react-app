import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map(article => (
                <div key={article.name}>
                    <Link to={`/articles/${article.name}`}>
                        <h3>{article.title}</h3>
                    </Link>
                    <p>{article.content[0].substring(0, 150)}...</p>
                </div>
            ))}
        </>

    )
}

export default ArticlesList;