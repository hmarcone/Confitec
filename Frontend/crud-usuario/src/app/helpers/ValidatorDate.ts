import { AbstractControl, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const today = new Date().getTime();
    const today = new Date();

    if(!(control && control.value)) {
      // se não há controle ou nenhum valor, tudo bem
      return null;
    }

    const dataDigitada = new Date(control.value);

    console.log('today: ' + new Date().toLocaleDateString());
    console.log('dataDigitada: ' + dataDigitada.toLocaleDateString());

    // retorna null se não houver erros
    // return control.value.getTime() >= today
    return dataDigitada.toLocaleDateString() >= today.toLocaleDateString()
      ? {invalidDate: 'Você não pode usar datas futuras!' }
      : null;
  }
}
