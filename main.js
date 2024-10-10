const heroi = {
    nome: "Jhow Jhow",
    vida: 100,
    ataqueBasico: 20,
    ataqueForte: 35,
    energia: 100,
    maxEnergia: 100,
    custoEnergiaForte: 30
};
const inimigos = [
    { nome: "Treinador Exigente", vida: 80, ataqueBasico: 15, ataqueForte: 30, energia: 50, maxEnergia: 50, custoEnergiaForte: 20 },
    { nome: "Adversário Fortão", vida: 120, ataqueBasico: 25, ataqueForte: 40, energia: 60, maxEnergia: 60, custoEnergiaForte: 25 },
    { nome: "Juiz Rigoroso", vida: 100, ataqueBasico: 30, ataqueForte: 50, energia: 70, maxEnergia: 70, custoEnergiaForte: 30 }
];

function mostrarStatus(personagem, inimigo) {
    console.log(`--- Status do Herói ---`);
    console.log(`Vida: ${personagem.vida} \nAtaque: ${personagem.ataqueBasico} \nAtaque Forte: ${personagem.ataqueForte} \nEnergia: ${personagem.energia}/${personagem.maxEnergia}`);
    console.log(`--- Status do Inimigo (${inimigo.nome}) ---`);
    console.log(`Vida: ${inimigo.vida} \nAtaque: ${inimigo.ataqueBasico} \nAtaque Forte: ${inimigo.ataqueForte} \nEnergia: ${inimigo.energia}/${inimigo.maxEnergia}`);
}

function atacar(inimigo, tipoAtaque) {
    let dano;
    let mensagem;
    let chanceDeFalha = Math.random();

    if (tipoAtaque === "basico") {
        dano = heroi.ataqueBasico;
        mensagem = `Você acerta ${inimigo.nome} com uma cortada rápida, causando ${dano} de dano!`;
    } else if (tipoAtaque === "forte" && heroi.energia >= heroi.custoEnergiaForte) {
        dano = heroi.ataqueForte;
        heroi.energia -= heroi.custoEnergiaForte;
        mensagem = `Você acerta ${inimigo.nome} com um smash poderoso, causando ${dano} de dano!`;
    } else {
        console.log("Você não tem energia suficiente para realizar um ataque forte!");
        return;
    }

    if (chanceDeFalha > 0.2) {
        console.log(mensagem);
        inimigo.vida -= dano;
    } else {
        console.log(`${inimigo.nome} desvia do seu ataque!`);
    }
}

function ataqueInimigo() {
    let chanceDeAtaqueForte = Math.random();
    let chanceDeFalha = Math.random();

    if (chanceDeAtaqueForte > 0.5 && inimigoAtual.energia >= inimigoAtual.custoEnergiaForte) {
        if (chanceDeFalha > 0.2) {
            console.log(`${inimigoAtual.nome} realiza um ataque forte e causa ${inimigoAtual.ataqueForte} de dano!`);
            heroi.vida -= inimigoAtual.ataqueForte;
            inimigoAtual.energia -= inimigoAtual.custoEnergiaForte;
        } else {
            console.log(`Você desvia do ataque forte de ${inimigoAtual.nome}!`);
        }
    } else {
        if (chanceDeFalha > 0.2) {
            console.log(`${inimigoAtual.nome} ataca com um golpe básico e causa ${inimigoAtual.ataqueBasico} de dano!`);
            heroi.vida -= inimigoAtual.ataqueBasico;
        } else {
            console.log(`Você desvia do ataque básico de ${inimigoAtual.nome}!`);
        }
    }
}

function recuar(inimigo) {
    const chanceDeRecuo = Math.random();

    if (chanceDeRecuo > 0.5) {
        console.log(`Você recua com sucesso, recuperando fôlego!`);
        heroi.energia -= 10;
        heroi.vida += 20;
        console.log(`Sua vida agora é ${heroi.vida} e sua energia agora é ${heroi.energia}.`);
    } else {
        console.log(`Você tenta recuar, mas tropeça na areia! ${inimigo.nome} aproveita a oportunidade e ataca!`);
        heroi.vida -= inimigo.ataqueBasico;
        console.log(`Você leva ${inimigo.ataqueBasico} de dano! Sua vida agora é ${heroi.vida}.`);
        heroi.energia -= 10;
        console.log(`Sua vida agora é ${heroi.vida} e sua energia agora é ${heroi.energia}.`);
    }
}

function regenerarEnergia(personagem) {
    personagem.energia += 10;
    if (personagem.energia > personagem.maxEnergia) {
        personagem.energia = personagem.maxEnergia;
    }
}


function mostrarIntroducao() {
    console.log("Bem-vindo ao mundo do Beach Tennis!");
    console.log("Você é um jovem prodígio do Beach Tennis que, após ser desafiado por seu treinador, agora enfrenta os maiores nomes do esporte em batalhas épicas.");
    console.log("Seu objetivo é vencer cada adversário e provar que você merece ser o campeão da temporada.");
    console.log("Prepare-se, pois o caminho para a glória será cheio de desafios e competições acirradas!");
}

function start() {
    mostrarIntroducao();
    alert("Bem-vindo ao RPG de Beach Tennis!");
    
    for (let i = 0; i < inimigos.length; i++) {
        inimigoAtual = inimigos[i];
        alert(`Você está enfrentando ${inimigoAtual.nome}!`);
        
        while (heroi.vida > 0 && inimigoAtual.vida > 0) {
            mostrarStatus(heroi, inimigoAtual);
            let acao = prompt("O que você quer fazer? \n1: Ataque normal \n2: Ataque forte (-30 de energia) \n3: Recuar (-10 de energia)");

            if (acao === "1") {
                atacar(inimigoAtual, "basico");
            } else if (acao === "2") {
                atacar(inimigoAtual, "forte");
            } else if (acao === "3") {
                recuar(inimigoAtual);
                if (heroi.vida <= 0)
                    break;
            } else {
                console.log("Escolha inválida.");
            }

            if (inimigoAtual.vida > 0) {
                ataqueInimigo();
            } else {
                console.log(`${inimigoAtual.nome} foi derrotado!`);
            }

            regenerarEnergia(heroi);
            regenerarEnergia(inimigoAtual);
        }

        if (heroi.vida <= 0) {
            console.log("Você foi derrotado! Fim de jogo.");
            return;
        }
    }

    if (heroi.vida > 0) {
        console.log("Parabéns! Você venceu todos os desafios de Beach Tennis e se consagrou campeão!");
    }
}