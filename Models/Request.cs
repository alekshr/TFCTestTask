using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TFCTestTask.Models;

public class Request
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set;}
    public string Descriptions { get; set; }
    public string Email { get; set; }
    public DateTime DateTimeDeadline { get; set; }
    public int ApplicationId { get; set; }
    [ForeignKey(nameof(ApplicationId))]
    public Application Application { get; set;}
}