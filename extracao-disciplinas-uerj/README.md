Exercício Disciplinas do currículo/A cursar (JSON)

Aluno: Marco André Costa.

Passo a passo:

Eu abri a página das disciplinas no Aluno Online e usei o console do navegador para acessar os dados que já estavam carregados na tabela (Ctrl + Shift + I). 

Primeiro eu transformei cada linha da tabela em uma lista de valores usando:

const tabela = document.querySelector("table");

const linhas = [...tabela.querySelectorAll("tr")];

const dados = linhas.map(linha =>
  [...linha.querySelectorAll("td")].map(celula => celula.innerText.trim())
).filter(linha => linha.length > 0);

console.log(JSON.stringify(dados, null, 2));

Depois organizei esses valores em campos, como código da disciplina, nome, período, créditos e carga horária:

const linhasDisciplinas = [...document.querySelectorAll("tr")]
  .map(tr => [...tr.querySelectorAll("td")].map(td => td.innerText.trim()))
  .filter(linha => linha.length === 9);

const disciplinas = linhasDisciplinas.map(linha => {
  const primeiraColuna = linha[0];
  const match = primeiraColuna.match(/^([A-Z]{3}\d{2}-\d+)\s+(.+)$/);

  return {
    codigo: match ? match[1] : primeiraColuna,
    disciplina: match ? match[2] : "",
    periodo: linha[1] === "-" ? null : Number(linha[1]),
    atendida: linha[2] === "Sim",
    tipo: linha[3],
    ramificacao: Number(linha[4]),
    creditos: Number(linha[5]),
    carga_horaria_total: Number(linha[6]),
    trava_credito: Number(linha[7]),
    turma_no_periodo: linha[8] === "Sim"
  };
});

console.log(JSON.stringify(disciplinas, null, 2));


Por fim, converti essa estrutura para JSON, que é um formato de texto usado para representar dados de forma organizada:


const json = JSON.stringify(disciplinas, null, 2);

const blob = new Blob([json], { type: "application/json" });
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "disciplinas_uerj.json";
a.click();

URL.revokeObjectURL(url);



No primeiro código, eu selecionei as linhas da tabela da página e li o conteúdo das células. Depois filtrei apenas as linhas que realmente representavam disciplinas. No segundo passo, eu separei o código do nome da disciplina e associei cada coluna a uma propriedade, como codigo, disciplina, periodo, creditos e carga_horaria_total. Depois usei JSON.stringify para converter esses objetos para o formato JSON.


HTML -> é a estrutura da página onde a tabela está.
JavaScript ->  foi a linguagem usada no console para ler essa tabela.
Objeto -> cada disciplina virou um conjunto de informações.
JSON -> é a forma textual organizada desses objetos, agrupada em um arquivo que pode ser baixado.

