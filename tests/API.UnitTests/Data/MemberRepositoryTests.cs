using System.Threading.Tasks;
using API.Data;

namespace API.UnitTests.Data;

public class MemberRepositoryTests
{
    private AppDbContext _context;
    private MembersRepository _memberRepository;

    [SetUp]
    public void Setup()
    {
        _context = GlobalTestSetup.AppDbContext;
        _memberRepository = new MembersRepository(_context);
    }

    [Test]
    public async Task Test1()
    {
        //Arrange & Act
        var members = await _memberRepository.GetMembersAsync();

        //Assert
        Assert.That(members, Is.Not.Null);
        Assert.That(members, Has.Count.EqualTo(10));
    }
}
