export default function convertCurrency(value, { rate: leftRate }, { rate: rightRate }) {
    return (Number(value) * (leftRate / rightRate)).toFixed(2)
}