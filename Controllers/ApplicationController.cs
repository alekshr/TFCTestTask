using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TFCTestTask.Contexts;
using TFCTestTask.Models;

namespace TFCTestTask.Controllers;

[ApiController]
[Route("[controller]")]
public class ApplicationController : ControllerBase
{
    private readonly ApplicationContext applicationContext;

    public ApplicationController(ApplicationContext applicationContext)
    {
        this.applicationContext = applicationContext;
    }

    [HttpGet]
    public IEnumerable<Application> Get()
    {
        var applications = applicationContext.Applications.ToList();
        return applications;
    }
}