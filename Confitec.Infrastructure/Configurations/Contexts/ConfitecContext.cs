using Confitec.Domain.Entities;
using Confitec.Infrastructure.Configurations.Entities;
using Microsoft.EntityFrameworkCore;

namespace Confitec.Infrastructure.Configurations.Contexts
{
    public class ConfitecContext: DbContext
    {
        public ConfitecContext(DbContextOptions<ConfitecContext> options)
                    : base(options) { }

        public DbSet<Usuario> Usuarios {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            _ = new UsuarioConfiguration(modelBuilder.Entity<Usuario>());
        }
    }
}
