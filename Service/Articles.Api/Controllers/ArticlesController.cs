using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticlesController : ControllerBase
{
    private static IList<Article> Articles = new List<Article>
    {
        new Article
        {
            Title = "Article about adding Swagger to Dotnet WebAPI",
            Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        new Article
        {
            Title = "Another Hard-codeed artcle",
            Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
    };

    private readonly ILogger<ArticlesController> _logger;

    public ArticlesController(ILogger<ArticlesController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetArticles")]
    [ProducesResponseType(typeof(IList<Article>), 200)]
    public IActionResult Get()
    {
        var articles = Articles;

        return Ok(articles);
    }

    [HttpGet("{articleId}", Name = "GetArticleById")]
    [ProducesResponseType(404)]
    [ProducesResponseType(typeof(Article), 200)]
    public IActionResult GetById(string articleId)
    {
        var article = Articles.FirstOrDefault(a => string.Equals(a.Id, articleId, StringComparison.OrdinalIgnoreCase));
        if (article == null)
        {
            return NotFound($"Article with id {articleId} was not found");
        }

        return Ok(article);
    }

    [HttpPost(Name = "CreateArticle")]
    [ProducesResponseType(typeof(Article), 201)]
    public IActionResult Post([FromBody] ArticleInput articleInput)
    {
        var article = new Article(articleInput);

        Articles.Add(article);

        var routeValues = new { articleId = article.Id };

        return CreatedAtAction(nameof(GetById), routeValues, article);
    }
}
