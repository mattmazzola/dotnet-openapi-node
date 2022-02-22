namespace Server.Models;

public class ArticleInput
{
    [Required]
    public string Title { get; init; }

    [Required]
    public string Body { get; init; }
}

public class Article : ArticleInput
{
    [Required]
    public string Id { get; init; } = Guid.NewGuid().ToString();

    public Article()
    {
    }

    public Article(ArticleInput articleInput)
    {
        Title = articleInput.Title;
        Body = articleInput.Body;
    }
}
