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
