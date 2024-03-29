using Microsoft.EntityFrameworkCore;
using TFCTestTask.Contexts;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

        builder.Services.AddTransient<DbContext, ApplicationContext>();
        builder.Services.AddControllersWithViews();
        string? conn = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services
            .AddDbContext<ApplicationContext>(
                options => options.UseMySql(conn, ServerVersion.AutoDetect(conn),
                    mySqlOptions => mySqlOptions.MaxBatchSize(100)));


        var app = builder.Build();


// Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
        app.MapFallbackToFile("index.html");

        app.Run();
    }
}