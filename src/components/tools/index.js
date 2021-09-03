function ConvertCurrency(number) {
    const currency = number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    return currency;
}

export default ConvertCurrency;