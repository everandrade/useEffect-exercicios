import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    if (tarefas.length > 0) {
      const tarefasJson = JSON.stringify(tarefas)
      localStorage.setItem("tarefas", tarefasJson)
    }
  }, [tarefas])

  useEffect(() => {
    const tarefasJson = localStorage.getItem("tarefas")
    if (tarefasJson) {
      const tarefasArray = JSON.parse(tarefasJson)
      setTarefa(tarefasArray)
    }
  }, [])

  const criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: inputValue,
      completa: false
    }
    setTarefa([novaTarefa, ...tarefas])
    setInputValue("")
  }

  const selectTarefa = (id) => {
    const copiaTarefas = [...tarefas]
    for (let tarefa of copiaTarefas) {
      if (tarefa.id === id) tarefa.completa = !tarefa.completa
    }
    setTarefa(copiaTarefas)
  }

  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
