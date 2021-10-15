using Confitec.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confitec.Infrastructure.Interfaces
{
    public interface IUsuario
    {
        Task<List<Usuario>> GetAllUsuariosAsync();
        Task<Usuario> GetUsuariosByIdAsync(int usuarioId);
        Task<List<Usuario>> GetUsuariosByNomeAsync(string nome);
    }
}
