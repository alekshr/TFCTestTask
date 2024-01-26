using Microsoft.AspNetCore.Mvc;
using TFCTestTask.Contexts;

namespace TFCTestTask.Controllers;

[ApiController]
[Route("[controller]")]
public class ApplicationController : ControllerBase
{
    private readonly int pageSize;
    private readonly ApplicationContext applicationContext;

    public ApplicationController(ApplicationContext applicationContext)
    {
        this.pageSize = 10;
        this.applicationContext = applicationContext;
    }

    [HttpGet("allapplications")]
    public IActionResult AllApplications()
    {
        var apps = applicationContext
            .Applications
            .ToList();

        return Ok(apps);
    }

    [HttpGet("applications/{page?}")]
    public IActionResult Applications(int page)
    {
        var skip = (page - 1) * this.pageSize;

        var apps = applicationContext
            .Applications
            .OrderBy(app => app.Id)
            .Skip(skip)
            .Take(this.pageSize)
            .ToList();
        return Ok(apps);
    }

    [HttpGet("count-applications")]
    public IActionResult GetCountApplications()
    {
        var countApplications = applicationContext
            .Applications
            .Count();

        var totalPages = (countApplications / this.pageSize) +
                         (countApplications % this.pageSize == 0 ? 0 : 1);

        return Ok(totalPages);
    }
}