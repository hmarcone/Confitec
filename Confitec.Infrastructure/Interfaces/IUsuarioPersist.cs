using Confitec.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confitec.Infrastructure.Interfaces
{
    public interface IUsuarioPersist
    {
        Task<List<Usuario>> GetAllUsuariosAsync();
        Task<Usuario> GetUsuarioByIdAsync(int usuarioId);
        Task<List<Usuario>> GetUsuariosByNomeAsync(string nome);
    }
}
