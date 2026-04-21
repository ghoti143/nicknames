using Microsoft.AspNetCore.Mvc;
using Api.Data;
using Api.Models;

namespace Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class NicknamesController : ControllerBase {
    private readonly AppDbContext _ctx;
    public NicknamesController(AppDbContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Nickname>>> Get() =>
        await _ctx.Nicknames.OrderBy(n => n.Id).ToListAsync();

    // Optional POST for future use
    [HttpPost]
    public async Task<ActionResult> Create(Nickname nick) {
        _ctx.Nicknames.Add(nick);
        await _ctx.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = nick.Id }, nick);
    }
}
