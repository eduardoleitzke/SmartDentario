function senhaValidator(senha) {
    console.log(senha);
    if (senha.length < 8) {
        return [false, "Senha deve conter 8 digitos."]
    }
    if (senha.indexOf("!") === -1 &&
        senha.indexOf("@") === -1 &&
        senha.indexOf("#") === -1 &&
        senha.indexOf("$") === -1 &&
        senha.indexOf("%") === -1 &&
        senha.indexOf("¨") === -1 &&
        senha.indexOf("&") === -1 &&
        senha.indexOf("*") === -1 &&
        senha.indexOf("-") === -1 &&
        senha.indexOf("_") === -1 &
        senha.indexOf("/") === -1
    ) {
        return [false, "Senha deve conter ao menos um caractere especial   !@#$%¨&**(_-+="]
    }
    if (senha.match(/[A-Z]/g) == null) {
        return [false, "Deve conter no mínimo uma letra Maiuscula"]
    }
    if (senha.match(/[0-9]/g) == null) {
        return [false, "Deve conter no mínimo um número"]
    }
    else {
        return [true]
    }
}

function telValidator(tel) {
    const ddds = ["68", "82", "92", "97", "96", "71", "73", "74", "75", "77", "85",
        "88", "61", "27", "28", "62", "64", "98", "99", "31", "32", "33",
        "34", "35", "37", "38", "67", "65", "66", "91", "93", "94", "83",
        "81", "87", "86", "89", "41", "42", "43", "44", "45", "46", "21",
        "22", "24", "84", "69", "95", "51", "53", "54", "55", "47", "48", "49",
        "79", "11", "12", "13", "14", "15", "16", "17", "18", "19", "63"]
    if (tel.length < 12) {
        return false
    }
    let ddd = tel[1] + tel[2]
    let dddValid = false
    console.log(ddd)

    ddds.forEach(i => {
        if (i === ddd) {
            dddValid = true
        }
    });
    if (dddValid) {
        return true
    }
    return false
}


export { senhaValidator, telValidator }

