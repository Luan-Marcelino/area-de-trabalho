const input = document.querySelectorAll('input');
const body = document.querySelector('body');
const nome = document.querySelector('#nome');

//Mostrar menu
const btnMenu = document.querySelector('.btn-menu');
btnMenu.addEventListener('click', (e) => {
       
    document.querySelector('nav').classList.toggle('mostrar');
    /*
    if(document.querySelector('nav').classList.contains('mostrar')) {
        btnMenu.style.alignSelf = 'center';
    }else {
        btnMenu.style.alignSelf = 'flex-start';
    }
    */
});

//Preenchendo as informações confidenciais do projeto. Ele busca essas informações no arquivo config.js e puxa os dados do objeto que esta salvo lá
document.addEventListener("DOMContentLoaded", () => {
    if (typeof dadosSensiveis !== "undefined") {
        document.querySelectorAll('[data-sensitive]').forEach(element => {
            const key = element.getAttribute('data-sensitive');
                        
            if (dadosSensiveis[key]) {
                element.textContent = dadosSensiveis[key];                
            }
        });
    }
});

document.querySelector('ul').addEventListener('click', async e => {
    const link = e.target.getAttribute('src');

    await navigator.clipboard.writeText(link);
    
})

//---------------- Nome --------------------//
const btnCopiarNomeCPF = document.querySelector('#container-nome button');
const cpf = document.querySelector('#cpf');

document.addEventListener('keydown', (e) => {
    const container_cpfBtn = document.querySelector('#btn-cpf');

    if(e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        container_cpfBtn.classList.toggle('none-input');
    }
})

btnCopiarNomeCPF.addEventListener('click', async () => {
    
    if(cpf.value !== '') {
        const nomeCpf = `"${nome.value}", ${cpf.value}`;
        await navigator.clipboard.writeText(nomeCpf);        
    }
    
})

//---------------- Fim Nome --------------------//

//---------------------------   INDICES   -------------------------------//

function selecionarAbaIndice(conteudoIndice) {
    //Removendo de todas as abas a classe ativo, depois colocando na aba que esta clicada
    document.querySelectorAll('.aba-btn-indice').forEach(btn => {btn.classList.remove('ativo');});
    conteudoIndice.classList.add('ativo');
    //removendo a classe show do conteudo do indice
    document.querySelectorAll('.container-indices').forEach(conteudo => {conteudo.classList.remove('show');});

    const idIndice = conteudoIndice.getAttribute('content-id');
    let conteudoAtual = document.getElementById(idIndice);
    // Adiciona a class show para os conteudos que tem o mesmo nome de id da aba que foi clicada
    conteudoAtual.classList.add('show');    
}

// Evita que os listenner se acumulem e manda o objeto clicado pra função
document.querySelector('.area-indices').addEventListener('click', (e) => {
    if(e.target.classList.contains('aba-btn-indice')) {
        selecionarAbaIndice(e.target);
    }
})

const btn_addIndice = document.querySelector('#btn-add-aba-indice');
// Criando as abas
btn_addIndice.addEventListener('click', () => {
    const numAba = document.querySelectorAll('.aba-btn-indice');

    const btnIndice = document.createElement('button');
    btnIndice.textContent = numAba.length + 1;
    btnIndice.classList.add('aba-btn-indice');
    btnIndice.setAttribute('content-id', `aba-indice${numAba.length+1}`);
    document.querySelector('#aba-indice').appendChild(btnIndice);
    
    const novoIndice = document.createElement('div');
    novoIndice.className = 'container-indices';
    novoIndice.id = `aba-indice${numAba.length+1}`;
    novoIndice.innerHTML = `
            <h3>Indices</h3>
            <div class="linha-indice">
                <label for="linha1">Indice Nacional</label>
                <input class="indice-nacional" name="linha1" type="text" autocomplete="off">
            </div>
            
            <div class="linha-indice">
                <label for="linha2">Indicadores</label>
                <input class="indicadores" name="linha2" type="text" autocomplete="off">
            </div>`

    document.querySelector('.area-indices').insertBefore(novoIndice, btn_addIndice);
    console.log(novoIndice);
    
    selecionarAbaIndice(btnIndice);
    
});

//---------------------------   FIM INDICES   -------------------------------//


//---------------------------   PROCEDIMENTOS   -------------------------------//

// Troca as abas, esconde e mostra a aba clicada
let abasProcedimento = document.querySelectorAll('.aba-btn');

const selecionarAba = (aba) => {
    //tirando o ativo das abas para colocar no que clicou
    document.querySelectorAll('.aba-btn').forEach(aba => aba.classList.remove('ativo'));
    aba.classList.add('ativo');

    //tirando o show de todos os conteudos para adicionar depois
    const conteudoProcedimento = document.querySelectorAll('.conteudo-procedimento');
    conteudoProcedimento.forEach(conteudo => conteudo.classList.remove('show'));

    //ele pega o nome do content-id e mostra o conteudo atual
    const conteudoId = aba.getAttribute('content-id');
    const conteudoAtual = document.getElementById(conteudoId);

    conteudoAtual.classList.add('show');
}

//resetando os listenners das abas  
document.querySelector('#abas-btn').addEventListener('click', (e) => {
    // Verifica se quem foi clicado tem a classe 'aba-btn'
    if (e.target.classList.contains('aba-btn')) {
        selecionarAba(e.target);
    }
});

// Troca botão de procedimentos para envolvidos
const selecao_btn_procedimento = (aba) => {
    const btn_procedimento_troca = aba.querySelector('.btn-procedimento');
    const btn_envolvimento_troca = aba.querySelector('.btn-envolvidos');
    const textarea_procedimentos = aba.querySelector('.texto-procedimento');
    const textarea_envolvimento = aba.querySelector('.texto-envolvidos');
    
    
    //troca para procedimento
    btn_procedimento_troca.addEventListener('click', () => {
        btn_procedimento_troca.style.backgroundColor = '#7c4c4c';
        btn_envolvimento_troca.style.backgroundColor = '#480000';
        
        textarea_envolvimento.classList.replace("mostrar", "esconder");
        textarea_procedimentos.classList.replace("esconder", "mostrar");
    });
    //troca para lista de envolvimento
    btn_envolvimento_troca.addEventListener('click', () => {
        btn_envolvimento_troca.style.backgroundColor = '#7c4c4c';
        btn_procedimento_troca.style.backgroundColor = '#480000';
        
        textarea_envolvimento.classList.replace("esconder", "mostrar");
        textarea_procedimentos.classList.replace("mostrar", "esconder");
    });    
    
}

document.querySelectorAll('.conteudo-procedimento').forEach(selecao_btn_procedimento);

// Botão que cria a aba
const btn_AddProcedimento = document.querySelector('#btn-add-aba-procedimento');

btn_AddProcedimento.addEventListener('click', () => {
    const numAba = document.querySelectorAll('.aba-btn');

    // Criar aba
    const aba_btn = document.createElement('button');
    aba_btn.textContent = numAba.length + 1; //Definindo o numero da aba
    aba_btn.classList.add('aba-btn'); // Aplicando a class
    aba_btn.setAttribute('content-id', `aba${numAba.length + 1}`); // Atribuindo um content-id
    document.querySelector('#abas-btn').appendChild(aba_btn);

    // Criar Conteudo
    const novaAba = document.createElement('div');
    novaAba.className = 'conteudo-procedimento';
    novaAba.id = `aba${numAba.length + 1}`;
    novaAba.innerHTML = `
                <div class="btn-escolha-procedimento">
                    <button class="btn-procedimento">Procedimentos</button>
                    <button class="btn-envolvidos">Lista de Envolvidos</button>
                </div>

                <textarea placeholder="Procedimentos" name="area-texto-procedimento" class="texto-procedimento mostrar"></textarea>
                <textarea placeholder="Lista de Envolvidos" name="area-texto-envolvidos" class="texto-envolvidos esconder"></textarea>
            `;
    
    document.querySelector('.area-procedimento').insertBefore(novaAba, btn_AddProcedimento);

    selecao_btn_procedimento(novaAba);

    //vai selecionar a aba que foi adicionada
    selecionarAba(aba_btn);
});
                
//---------------------------  FIM PROCEDIMENTOS   -------------------------------//

//---------------------------  CRIMINAIS   -------------------------------//


// Seleciona o botão de inquerito e processo
function selecionarCriminais() {
    const btnCriminais = document.querySelector('#btn-criminal');
    const btnInquerito = document.querySelector('.btn-inquerito');

    // Cor de seleção inicial
    btnInquerito.style.backgroundColor = '#7c4c4c';

    const btnProcesso = document.querySelector('.btn-processo');
    btnCriminais.addEventListener('click', (e) => {
                
        if(e.target.classList.contains('btn-inquerito')) {
            btnInquerito.style.backgroundColor = '#7c4c4c';
            btnProcesso.style.backgroundColor = '#480000';

            document.querySelector('.txt-inquerito').classList.replace('esconder', 'mostrar');
            document.querySelector('.txt-processo').classList.replace('mostrar', 'esconder');

        }else if(e.target.classList.contains('btn-processo')) {
            btnInquerito.style.backgroundColor = '#480000';
            btnProcesso.style.backgroundColor = '#7c4c4c';

            document.querySelector('.txt-inquerito').classList.replace('mostrar', 'esconder');
            document.querySelector('.txt-processo').classList.replace('esconder', 'mostrar');
        }
        
    });
}

selecionarCriminais();

function formatarCriminaisInquerito(inquerito) {
    let textoFinal = '';
    console.log(inquerito);
    
        const blocos = inquerito.split('\n\n');
        blocos.forEach(texto => {
            const quebrarLinha = texto.split('\n');
            let textoParcial = [];
            // Tirando os espaços de tab(\t)
            quebrarLinha.forEach(linha => {
                const textoSemEspaco = linha.replace(/\t/g,'');
                textoParcial.push(textoSemEspaco);            
            });
                    
            textoFinal += `${textoParcial[0]})\nNúmero/Ano: ${textoParcial[1]}\nDelegacio: ${textoParcial[2]}\nVitima: ${textoParcial[3]}\nData do fato: ${textoParcial[4]}\nData da instauração: ${textoParcial[5]}\nIncidencia penal: ${textoParcial[6]}\n\n`;
        });

    if(inquerito !== '') {
        return textoFinal.replace(/undefined/g,'');
    }else {
        return textoFinal = '';
    }
}

function formatarCriminaisProcesso(processo) {
    let textoFinal = '';

    const blocos = processo.split('\n\n');
    blocos.forEach(texto => {
        const quebrarLinha = texto.split('\n');
        let textoParcial = [];
        // Tirando os espaços de tab(\t)
        quebrarLinha.forEach(linha => {
            const textoSemEspaco = linha.replace(/\t/g,'');
            textoParcial.push(textoSemEspaco);            
        });
                
        textoFinal += `${textoParcial[0]})\nNúmero/Ano: ${textoParcial[1]}\nAutoridade judiciária: ${textoParcial[2]}\nTipo: ${textoParcial[3]}\nData da decisão: ${textoParcial[4]}\nSituação: ${textoParcial[5]}\nNúmero/Ano do inquérito: ${textoParcial[6]}\nIncidência penal: ${textoParcial[7]}\nPenas: ${textoParcial[8]}\n\n`;
    });

    if(processo !== '') {
        return textoFinal.replace(/undefined/g,'');
    }else {
        return textoFinal = '';
    }
}

document.querySelector('.area-criminal').addEventListener('input', e => {
    if(e.target.classList.contains('txt-inquerito') || e.target.classList.contains('txt-processo')) {
        gerarRelatorioCompleto();
    }
});

//---------------------------- RELATORIO -------------------------------//

const relatorio = document.querySelector('#relatorio textarea');

function formatandoProcedimento(textoProcedimento) {
    const texto = textoProcedimento.value;
    // Separar o txt por quebrar linha
    const textoFormatado = texto.split('\n');
    
    let textoFinal = '';// Variavel para guardar o que vai ser formatado
    let contador = 0;

    if(textoFormatado[0] != "") {
        while(contador < textoFormatado.length) {
            textoFinal += `${textoFormatado[contador]}: ${textoFormatado[contador + 1]}\n`;
            //A terceira linha é ""
            contador = contador + 3;
        }  
    }else {
        //Se a primeira linha estiver "", ele vai somar mais 1 para dar certo
            contador = 1;
            while(contador < textoFormatado.length) {
            textoFinal += `${textoFormatado[contador]}: ${textoFormatado[contador + 1]}\n`;
            //A terceira linha é ""
            contador = contador + 3;
            }
        }

    return textoFinal;
}

function formatandoEnvolvidos(textoEnvolvidos) {
    const texto = textoEnvolvidos.value;
    const textoFormatado = texto.split('\n');
    let envolvidos = '';
    let contador = 0;
    
    while(contador < textoFormatado.length) {
        envolvidos += `Nome:${textoFormatado[contador]} - ${textoFormatado[contador + 2]} - Natureza:${textoFormatado[contador + 4]}\n`;
        contador = contador + 6;
    }
    
    return envolvidos;    
}

function gerarRelatorioCompleto() {
    let relatorioParcial = [];
    let relatorioFinal = '';
    
    const nomeFormatado = nome.value.toUpperCase();

    const indicesAtivo = document.querySelector('#indices').checked;
    const procedimentoAtivo = document.querySelector('#procedimento').checked;
    const criminalAtivo = document.querySelector('#criminal').checked;
    const boAtivo = document.querySelector('#bo').checked;
    
    if(nomeFormatado !== '') {
        //Criminal
        if(criminalAtivo) {
            relatorioParcial.push(`- PRODESP/ANALÍTICO SP=> Constam Criminal para ${nomeFormatado}`);
        }else {
            relatorioParcial.push(`- PRODESP/ANALÍTICO SP=> Não constam Criminal para ${nomeFormatado}`);
        }

        //B.O's
        if(boAtivo) {
            relatorioParcial.push(`- BOs RDO-SPJ SP=> Constam BOs para ${nomeFormatado}\n`);
        }else {
            relatorioParcial.push(`- BOs RDO-SPJ SP=> Não Constam BOs para ${nomeFormatado}\n`);
        }

        //Indices
        if(indicesAtivo) {
            relatorioParcial.push(`- INFOSEG=> Constam Índices(Instruções Criminais) para ${nomeFormatado}`);
        }else {
            relatorioParcial.push(`- INFOSEG=> Não constam Índices(Instruções Criminais) para ${nomeFormatado}`);
        }

        //Procedimentos
        if(procedimentoAtivo) {
            relatorioParcial.push(`- INFOSEG=> Constam Procedimentos(Boletins de Ocorrência) para ${nomeFormatado}\n\n`);
        }else {
            relatorioParcial.push(`- INFOSEG=> Não Constam Procedimentos(Boletins de Ocorrência) para ${nomeFormatado}\n\n`);
        }

        relatorioFinal += relatorioParcial.join('\n');
    }
    // verificando se tem indice para colocar o cabeçalho
    if(indicesAtivo) {
        const abaIndices = document.querySelectorAll('.container-indices');
        
        relatorioFinal += `=====================================================================================
************ ÍNDICES(INSTRUÇÕES CRIMINAIS) PARA => ${nome.value.toUpperCase()} ************
=====================================================================================\n\n`;
        
            abaIndices.forEach(aba => {
                const indiceNacional = aba.querySelector('.indice-nacional');
                const indicadores = aba.querySelector('.indicadores');
                    
                    relatorioFinal += `Índice Nacional por(pela) ${indiceNacional.value}\nIndicadores:${indicadores.value}\n\n`;
            });
        
        }
        if(criminalAtivo) {
            const inquerito = document.querySelector('.txt-inquerito');
            const processo = document.querySelector('.txt-processo');

            const inqueritoFormatado = formatarCriminaisInquerito(inquerito.value);
            const processoFormatado = formatarCriminaisProcesso(processo.value);

            relatorioFinal += `=====================================================================================
************ INQUÉRITOS POLICIAIS PARA => ${nomeFormatado} ************
=====================================================================================\n\n${inqueritoFormatado}\n=====================================================================================
************ PROCESSOS CRIMINAIS PARA => ${nomeFormatado} ************
=====================================================================================\n\n${processoFormatado}\n`
        }

        if(procedimentoAtivo) {
            const abas = document.querySelectorAll('.conteudo-procedimento');

            relatorioFinal += `=====================================================================================
************ PROCEDIMENTOS(BOLETIM DE OCORRÊNCIA) PARA => ${nome.value.toUpperCase()} ************
=====================================================================================\n\n`;
    
            abas.forEach((aba, index) => {
                const num = index + 1;
                const txtProcedimento = aba.querySelector('.texto-procedimento');
                const txtEnvolvidos = aba.querySelector('.texto-envolvidos');

                const textoProc = formatandoProcedimento(txtProcedimento);
                const textoEnvol = formatandoEnvolvidos(txtEnvolvidos);

                relatorioFinal += `==========>PROCEDIMENTO N°: ${num}\n${textoProc}\nEnvolvidos:\n${textoEnvol}======================================================\n\n`;
                
            });
            relatorioFinal += `######### FIM PROCEDIMENTOS #########\n\n`;
    }
    
    if(boAtivo){

        // Os b.os é só o value 
        const bos = document.querySelector('#conteudo-bo');
        relatorioFinal += `=====================================================================================
************ BOLETIM DE OCORRÊNCIA RDO-SPJ SP ${nome.value.toUpperCase()} ************
=====================================================================================\n
${bos.value}`;

    }
       
    relatorio.value = relatorioFinal;
}

//Toda vez que algo for digitado nas txtarea de procedimento, ele vai executar, fazendo isso os Listenners não vão se acumular
document.querySelector('.area-procedimento').addEventListener('input', (e) => {
    if(e.target.classList.contains('texto-procedimento')|| e.target.classList.contains('texto-envolvidos')) {
        gerarRelatorioCompleto();      
       }
});

document.querySelector('.area-indices').addEventListener('input', (e) => {
    if(e.target.classList.contains('indice-nacional') || e.target.classList.contains('indicadores')) {
        gerarRelatorioCompleto();
    }
});

document.querySelector('.area-bo').addEventListener('input', (e) => {
    if(e.target.classList.contains('conteudo-bo')) {
        gerarRelatorioCompleto();
    }
});

nome.addEventListener('input', () => {
    gerarRelatorioCompleto();
})

//Função para limparar tuuuudo
function limpaTudo(){
    //Limpando todas as textAreas e Inputs
    document.querySelector('#nome').value = '';
    document.querySelector('#cpf').value = '';
    document.querySelectorAll('.indice-nacional').forEach(indice => {indice.value = '';});
    document.querySelectorAll('.indicadores').forEach(indicadores => {indicadores.value = ''});
    document.querySelectorAll('.texto-procedimento').forEach(texto => {texto.value = ''});
    document.querySelectorAll('.texto-envolvidos').forEach(texto => {texto.value = ''});
    document.querySelector('.txt-inquerito').value = '';
    document.querySelector('.txt-processo').value = '';
    document.querySelector('.conteudo-bo').value = '';
    relatorio.value = '';
    //desmarcando as checkbox
    document.querySelectorAll('.input-chekbox').forEach(checkbox => {checkbox.checked = false;});
    //fechando as areas
    document.querySelector('.area-indices').classList.remove('mostrar-area');
    document.querySelector('.area-procedimento').classList.remove('mostrar-area');
    document.querySelector('.area-criminal').classList.remove('mostrar-area');
    document.querySelector('.area-bo').classList.remove('mostrar-area');

    //selecionando a aba inquerito apos apagar 
    const btnProcesso = document.querySelector('.btn-processo');
    const btnInquerito = document.querySelector('.btn-inquerito');

    btnInquerito.style.backgroundColor = '#7c4c4c';
    btnProcesso.style.backgroundColor = '#480000';
    document.querySelector('.txt-inquerito').classList.replace('esconder', 'mostrar');
    document.querySelector('.txt-processo').classList.replace('mostrar', 'esconder');

    //removendo as abas dos Indices
    const abaIndicePai = document.querySelector('#aba-indice');
    const abaIndiceFilho = abaIndicePai.querySelectorAll('.aba-btn-indice');
    const conteudoIndicePai = document.querySelector('.area-indices');
    const conteudoIndiceFilho = conteudoIndicePai.querySelectorAll('.container-indices');

    for(let i = abaIndiceFilho.length -1; i > 0; i--){ // Apaga de trás para frente
        abaIndicePai.removeChild(abaIndiceFilho[i]);
        conteudoIndicePai.removeChild(conteudoIndiceFilho[i]);
    }

    selecionarAbaIndice(abaIndiceFilho[0]);

    //removendo as abas dos procedimentos
    const abaProcedimentoPai = document.querySelector('#abas-btn');
    const abaProcedimentoFilho = abaProcedimentoPai.querySelectorAll('.aba-btn');
    const conteudoProcedimentoPai = document.querySelector('.area-procedimento');
    const conteudoProcedimentoFilho = conteudoProcedimentoPai.querySelectorAll('.conteudo-procedimento');

    for(let i = abaProcedimentoFilho.length -1; i > 0; i--){ // Apaga de trás para frente
        abaProcedimentoPai.removeChild(abaProcedimentoFilho[i]);
        conteudoProcedimentoPai.removeChild(conteudoProcedimentoFilho[i]);
    }

    selecionarAba(abaProcedimentoFilho[0]);
    document.querySelector('.btn-procedimento').style.backgroundColor = '#7c4c4c';
    document.querySelector('.texto-procedimento').classList.replace('esconder', 'mostrar');

    document.querySelector('.btn-envolvidos').style.backgroundColor = '#480000';
    document.querySelector('.texto-envolvidos').classList.replace('mostrar', 'esconder');
    

}   

document.querySelector('#gerar-relatorio').addEventListener('click', async () => {
    const textoRelatorio = relatorio.value;
    await navigator.clipboard.writeText(textoRelatorio);
    limpaTudo();
});

// 
 const btnVerRelatorio = document.querySelector('#ver-relatorio');
 btnVerRelatorio.addEventListener('click', () =>{
    document.querySelector('.relatorio').classList.toggle('abrir-relatorio');
 })

//---------------------------- FIM RELATORIO -------------------------------//


//---------------------------   CHECKBOXES   -------------------------------//

const selectionarCheckbox = (checkbox) => {
    const nomeCheckbox = checkbox.getAttribute('id');
    let checkboxAtual = document.querySelector(`.area-${nomeCheckbox}`);
    
    if(checkboxAtual) {
        checkboxAtual.classList.toggle('mostrar-area');     
    }

}

const todosCheckBox = document.querySelector('#area-selecao');

todosCheckBox.addEventListener('click', e => {
    if(e.target.matches('input[type="checkbox"]')){
        selectionarCheckbox(e.target)
        gerarRelatorioCompleto();
    }
    
});

//---------------------------   FIM CHECKBOXES   -------------------------------//

function deletarAbas(divAba, aba, divConteudo, conteudo, tipoSelecao){
    const abaPai = document.querySelector(divAba);
    const abaFilho = abaPai.querySelectorAll(aba);
    const conteudoPai = document.querySelector(divConteudo);
    const conteudoFilho = conteudoPai.querySelectorAll(conteudo);

    if(abaFilho.length > 1 && conteudoFilho.length > 1) {
        abaPai.removeChild(abaFilho[abaFilho.length - 1]);// Remove última aba
        conteudoPai.removeChild(conteudoFilho[conteudoFilho.length - 1]);// Remove último container-indice
    }

    abaFilho.forEach(aba => aba.classList.remove('ativo'));
    conteudoFilho.forEach(conteudo => conteudo.classList.remove('show'));
   
   
   if(tipoSelecao === 'indice') {
        selecionarAbaIndice(abaFilho[0]);
   }else {
        selecionarAba(abaFilho[0]);
   }
}

document.querySelector('#aba-indice').addEventListener('dblclick', () => {
    deletarAbas('#aba-indice', '.aba-btn-indice', '.area-indices', '.container-indices','indice');

});

document.querySelector('#abas-btn').addEventListener('dblclick', () => {
    deletarAbas('#abas-btn', '.aba-btn', '.area-procedimento', '.conteudo-procedimento', '');
});