using Microsoft.EntityFrameworkCore;
using TFCTestTask.Models;

namespace TFCTestTask.Contexts;

public class ApplicationContext : DbContext
{
    public DbSet<Application> Applications { get; set; } = null!;
    public DbSet<Request> Requests { get; set; } = null!;

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
}