import { ArticlesApi, Configuration } from '@dotnetopenapinode/articles'

const baseUrl = `https://localhost:7002`
const configuration = new Configuration({ basePath: baseUrl })

export const articlesApi = new ArticlesApi(configuration)