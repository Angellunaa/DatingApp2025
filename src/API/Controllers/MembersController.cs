using API.Entities;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMembersRepository memebersRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
    {
        return Ok(await memebersRepository.GetMembersAsync());
    }

    [HttpGet("{id}")] // https://localhost:5001/api/members/bob-id
    public async Task<ActionResult<Member>> GetMember(string id)
    {
        var member = await memebersRepository.GetMemberAsync(id);

        if (member == null) return NotFound();

        return member.ToResponse();
    }

    [HttpGet("{id}/photos")]
    public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotos(string id)
    {
        return Ok(await memebersRepository.GetPhotosAsync(id));
    }
}
