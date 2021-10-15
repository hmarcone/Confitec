using AutoMapper;
using Confitec.Application.Dtos;
using Confitec.Application.Interfaces;
using Confitec.Domain.Entities;
using Confitec.Infrastructure.Interfaces;
using Confitec.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Confitec.Application.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericPersist _genericPersist;
        private readonly UsuarioPersist _usuarioPersist;
        private readonly IMapper _mapper;

        public UsuarioService(IGenericPersist generic, UsuarioPersist usuarioPersit, IMapper mapper)
        {
            _genericPersist = generic ?? throw new ArgumentNullException(nameof(generic));
            _usuarioPersist = usuarioPersit ?? throw new ArgumentNullException(nameof(usuarioPersit));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<UsuarioDto> AddUsuario(UsuarioDto usuarioDto)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(usuarioDto);

                _genericPersist.Add<Usuario>(usuario);

                if (await _genericPersist.SaveChangesAsync())
                {
                    var usuarioRetorno = await _usuarioPersist.GetUsuarioByIdAsync(usuario.Id);

                    return _mapper.Map<UsuarioDto>(usuarioRetorno);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<UsuarioDto> UpdateUsuario(int usuarioId, UsuarioDto usuarioDto)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioByIdAsync(usuarioId);

                if (usuario == null) return null;

                usuarioDto.Id = usuario.Id;

                _mapper.Map(usuarioDto, usuario);

                _genericPersist.Update<Usuario>(usuario);

                if (await _genericPersist.SaveChangesAsync())
                {
                    var usuarioRetorno = await _usuarioPersist.GetUsuarioByIdAsync(usuario.Id);

                    return _mapper.Map<UsuarioDto>(usuarioRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteUsuario(int usuarioId)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioByIdAsync(usuarioId);

                if (usuario == null) throw new Exception("Usuário não encontrado.");

                _genericPersist.Delete<Usuario>(usuario);

                return await _genericPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<UsuarioDto>> GetAllUsuariosAsync()
        {
            try
            {
                var usuarios = await _usuarioPersist.GetAllUsuariosAsync();

                if (usuarios == null) return null;

                var resultado = _mapper.Map<List<UsuarioDto>>(usuarios);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<UsuarioDto>> GetAllUsuariosByNomeAsync(string nome)
        {
            try
            {
                var usuarios = await _usuarioPersist.GetUsuariosByNomeAsync(nome);

                if (usuarios == null) return null;

                var resultado = _mapper.Map<List<UsuarioDto>>(usuarios);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UsuarioDto> GetUsuarioByIdAsync(int usuarioId)
        {
            try
            {
                var usuario = await _usuarioPersist.GetUsuarioByIdAsync(usuarioId);
                if (usuario == null) return null;

                var resultado = _mapper.Map<UsuarioDto>(usuario);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
