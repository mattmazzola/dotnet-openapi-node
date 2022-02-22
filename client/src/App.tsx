import React from 'react'
import { Article, ArticleInput, getArticles, postArticle } from './client'
import './App.css'

function App() {

  const [articles, setArticles] = React.useState<Article[]>([])
  React.useEffect(() => {
    let isMounted = true

    async function execute() {
      const articles = await getArticles()
      if (isMounted) {
        setArticles(articles)
      }
    }

    execute()

    return () => {
      isMounted = false
    }
  }, [])

  const [newArticleTitle, setNewArticleTitle] = React.useState('')
  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = e => {
    const title = e.target.value
    setNewArticleTitle(title)
  }

  const [newArticleBody, setNewArticleBody] = React.useState('')
  const onChangeBody: React.ChangeEventHandler<HTMLInputElement> = e => {
    const body = e.target.value
    setNewArticleBody(body)
  }

  const [isFormDisabled, setIsFormDisabled] = React.useState(false)
  const onSubmitNewArticle: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const articleInput: ArticleInput = {
      title: newArticleTitle,
      body: newArticleBody,
    }

    setIsFormDisabled(true)
    const article = await postArticle(articleInput)
    setArticles(articles => [...articles, article])
    setIsFormDisabled(false)
  }

  return (
    <div className="App">
      <header>
        <h1>Dotnet - OpenAPI - Node</h1>
        <p>Create build pipeline to generate and consume client</p>
      </header>
      <main>
        <h2>Add Article</h2>
        <form onSubmit={onSubmitNewArticle}>
          <div>
            <label htmlFor='titleId'>Title:</label>
            <input type="text" value={newArticleTitle} placeholder='Enter title' id="titleId" onChange={onChangeTitle} required />
          </div>
          <div>
            <label htmlFor='bodyId'>Body:</label>
            <input type="text" value={newArticleBody} placeholder='Enter title' id="bodyId" onChange={onChangeBody} required />
          </div>
          <button type="submit" disabled={isFormDisabled}>Submit</button>
        </form>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <h3><a href={article.id}>{article.title}</a></h3>
              <p>{article.body}</p>

            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App

