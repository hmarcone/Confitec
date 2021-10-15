using Confitec.Domain.Entities;
using Confitec.Infrastructure.Configurations.Contexts;
using Confitec.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Confitec.Infrastructure.Repositories
{
    public class UsuarioPersit : IUsuario
    {
        private readonly ConfitecContext _context;

        public UsuarioPersit(ConfitecContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<Usuario>> GetAllUsuariosAsync()
        {          
            return await _context.Usuarios.AsNoTracking().ToListAsync();
        }

        public async Task<Usuario> GetUsuariosByIdAsync(int usuarioId)
        {
            return await _context.Usuarios.AsNoTracking().SingleOrDefaultAsync(c => c.Id == usuarioId);
        }

        public async Task<List<Usuario>> GetUsuariosByNomeAsync(string nome)
        {
            return await _context.Usuarios.AsNoTracking().Where(x => x.Nome.ToLower().Contains(nome.ToLower())).ToListAsync();
        }
    }
}
