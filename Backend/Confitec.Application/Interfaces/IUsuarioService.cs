using Confitec.Application.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confitec.Application.Interfaces
{
    public interface IUsuarioService
    {
        Task<UsuarioDto> AddUsuario(UsuarioDto usuarioDto);
        Task<UsuarioDto> UpdateUsuario(int usuarioId, UsuarioDto usuarioDto);
        Task<bool> DeleteUsuario(int usuarioId);

        Task<List<UsuarioDto>> GetAllUsuariosAsync();
        Task<List<UsuarioDto>> GetAllUsuariosByNomeAsync(string nome);
        Task<UsuarioDto> GetUsuarioByIdAsync(int usuarioId);

    }
}
