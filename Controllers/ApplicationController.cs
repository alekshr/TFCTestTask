using Microsoft.AspNetCore.Mvc;
using TFCTestTask.Contexts;
using TFCTestTask.Models;

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
    public IEnumerable<Application> AllApplications()
    {
        var apps = applicationContext
            .Applications
            .ToList();
        return apps;
    }
    
    [HttpGet("applications/{page?}")]
    public IEnumerable<Application> Applications(int page)
    {
        var skip = (page - 1) * this.pageSize;
        var apps = applicationContext
            .Applications
            .OrderBy(app => app.Id)
            .Skip(skip)
            .Take(this.pageSize)
            .ToList();
        return apps;
    }
    
    [HttpGet("count-applications")]
    public int GetCountApplications()
    {
        var countApplications = applicationContext
            .Applications
            .Count();
        
        var totalPages = (countApplications / this.pageSize) +
                         (countApplications % this.pageSize == 0 ? 0 : 1);

        return totalPages;
    }
}