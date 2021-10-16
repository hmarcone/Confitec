using AutoMapper;
using Confitec.Application.Dtos;
using Confitec.Domain.Entities;

namespace Confitec.WebAPI.Helpers
{
    public class ConfitecProfile: Profile
    {
        public ConfitecProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
        }
    }
}
