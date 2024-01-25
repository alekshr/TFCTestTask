using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TFCTestTask.Contexts;
using TFCTestTask.Models;

namespace TFCTestTask.Controllers;

[ApiController]
[Route("[controller]")]
public class RequestController : ControllerBase
{
    private readonly ApplicationContext applicationContext;

    public RequestController(ApplicationContext applicationContext)
    {
        this.applicationContext = applicationContext;
    }
    
    [HttpGet]
    public IEnumerable<Request> Get()
    {
        var requests = applicationContext
            .Requests
            .Include(request => request.Application)
            .ToList();
        return requests;
    }

    [HttpPost]
    public IActionResult Post([FromBody] Request request)
    {
        if (ModelState.IsValid)
        {
            applicationContext.Database.ExecuteSqlInterpolated(
                @$"INSERT INTO Requests VALUES(default, {request.Title}, {request.Descriptions}, {request.Email}, {request.DateTimeDeadline}, {request.ApplicationId})");
            applicationContext.SaveChanges();
            return Ok();
        }
        return BadRequest(ModelState);
    }
    
    [HttpPut]
    public IActionResult Put([FromBody] Request request)
    {
        if (ModelState.IsValid)
        {
            applicationContext.Update(request);
            applicationContext.SaveChanges();
            return Ok();
        }
        return BadRequest(ModelState);
    }
}