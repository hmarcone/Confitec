using Confitec.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Confitec.Infrastructure.Configurations.Contexts
{
    public class ConfitecContext: DbContext
    {
        public ConfitecContext(DbContextOptions<ConfitecContext> options)
                    : base(options) { }

        public DbSet<Usuario> Usuarios {  get; set; }
    }
}
