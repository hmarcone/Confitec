using Confitec.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Confitec.Infrastructure.Configurations.Entities
{
    public class UsuarioConfiguration
    {
        public UsuarioConfiguration(EntityTypeBuilder<Usuario> entityBuilder)
        {
            entityBuilder.Property(x => x.Nome)
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnType("nvarchar");

            entityBuilder.Property(x => x.SobreNome)
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnType("nvarchar");

            entityBuilder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnType("nvarchar");
        }
    }
}
