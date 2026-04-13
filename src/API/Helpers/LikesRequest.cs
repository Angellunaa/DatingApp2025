using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class LikesRequest : PaginationRequest
    {
        [Required]
        public required string MemberId { get; set; } = "";
        [Required]
        public required string Predicate { get; set; } = "liked";
    }
}