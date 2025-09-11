using System;

namespace API.DTOs;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    public required string DisplayName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public required string Email { get; set; } = string.Empty;
    [Required]
    [MinLength(6)]
    public required string Password { get; set; } = string.Empty;
}
