using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TFCTestTask.Contexts;
using TFCTestTask.Models;

namespace TFCTestTask.Controllers;

[ApiController]
[Route("[controller]")]
public class RequestController : ControllerBase
{
    private readonly int pageSize;
    private readonly ApplicationContext applicationContext;

    public RequestController(ApplicationContext applicationContext)
    {
        this.pageSize = 10;
        this.applicationContext = applicationContext;
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
            return Ok(request);
        }

        return BadRequest(ModelState);
    }

    [HttpGet("requests/{page?}")]
    public IActionResult Requests(int page)
    {
        List<Request> requests = null;
        var skip = (page - 1) * this.pageSize;

        requests = applicationContext
            .Requests
            .Include(request => request.Application)
            .OrderBy(req => req.Id)
            .Skip(skip)
            .Take(this.pageSize)
            .ToList();
        return Ok(requests);
    }

    [HttpGet("count-requests")]
    public IActionResult GetCountRequests()
    {
        var countRequests = applicationContext
            .Requests
            .Count();

        var totalPages = (countRequests / this.pageSize) +
                         (countRequests % this.pageSize == 0 ? 0 : 1);

        return Ok(totalPages);
    }
}