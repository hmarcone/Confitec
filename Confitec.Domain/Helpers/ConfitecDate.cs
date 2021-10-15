using System;
using System.ComponentModel.DataAnnotations;

namespace Confitec.Domain.Helpers
{
    public class ConfitecDate: ValidationAttribute
    {
        public override bool IsValid(object value) // retorna um valor boleano: true == IsValid, false != IsValid
        {
            DateTime data = Convert.ToDateTime(value);
            return data < DateTime.Now; //Datas menores a hoje são válidas (true)

        }
    }
}
