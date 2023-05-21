export default function convertMMtoIN(mm) {
    let inches = mm / 25.4;
    let feet = Math.floor(inches / 12);
    let remainingInches = inches % 12;

    inches = inches.toFixed(2) + " in";
    feet = feet + " ft " + remainingInches.toFixed(2) + " in"

    return {inches, feet}
}