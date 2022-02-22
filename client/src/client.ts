
export type ArticleInput = {
    title: string
    body: string
}

export type Article
    = ArticleInput &
    {
        id: string
    }

const baseUrl = `https://localhost:7140`

async function getOrPostJson<T>(url: string, data?: object): Promise<T> {
    const fetchData = Boolean(data)
        ? {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        : undefined

    const response = await fetch(url, fetchData)
    if (!response.ok) {
        throw new Error(`Error during request for ${url}. ${response.status}: ${response.statusText}`)
    }

    const json = await response.json()
    
    return json as T
}

export async function getArticles(): Promise<Article[]> {
    const url = `${baseUrl}/articles`
    return getOrPostJson<Article[]>(url)
}

export async function getArticle(articleId: string): Promise<Article> {
    const url = `${baseUrl}/articles/${articleId}`
    return getOrPostJson<Article>(url)
}

export async function postArticle(articleInput: ArticleInput): Promise<Article> {
    const url = `${baseUrl}/articles`
    return getOrPostJson<Article>(url, articleInput)
}