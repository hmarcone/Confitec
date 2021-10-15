using Confitec.Domain.Enums;
using System;

namespace Confitec.Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public TipoEscolaridade Escolaridade { get; set; }
    }
}
