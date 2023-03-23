import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesList from './pages/ArticlesList';


function App() {
  return (

    <BrowserRouter>
    
      <div className="App">

        <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />

        </Routes>
        
      </div>
    
    </BrowserRouter>
    
  );
}

export default App;
