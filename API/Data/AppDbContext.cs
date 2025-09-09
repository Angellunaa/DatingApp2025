using DatingApp2025.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingApp2025.API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
}