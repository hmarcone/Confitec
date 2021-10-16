using Confitec.Domain.Enums;
using Confitec.Domain.Helpers;
using System;
using System.ComponentModel.DataAnnotations;

namespace Confitec.Application.Dtos
{
    public class UsuarioDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        StringLength(256, MinimumLength = 3,
                          ErrorMessage = "Intervalo permitido de 3 a 256 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        StringLength(256, MinimumLength = 3,
                          ErrorMessage = "Intervalo permitido de 3 a 256 caracteres.")]
        public string SobreNome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
        public string Email { get; set; }

        [ConfitecDate(ErrorMessage = "A data de nascimento não pode ser maior que hoje.")]
        public DateTime DataNascimento { get; set; }

        [EnumDataType(typeof(TipoEscolaridade), ErrorMessage = "Tipo de escolaridade inválido!")]
        public TipoEscolaridade Escolaridade { get; set; }

    }
}
