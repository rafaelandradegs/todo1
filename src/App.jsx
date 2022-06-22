import React, { useState, useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import './style.css'

export function App() {
  const [tarefa, setTarefa] = useState(() => {
    return ''
  })

  const [listaTarefas, setListaTarefas] = useState(() => {
    return []
  })

  const indexTarefa = useRef(0)
  const focus = useRef()

  function adicionaTarefa() {
    setListaTarefas(listaTarefas => {
      return [...listaTarefas, { id: indexTarefa.current, text: tarefa }]
    })
    indexTarefa.current++
    setTarefa(() => {
      return ''
    })
    focus.current.focus()
  }

  function removeListaTarefas() {
    setListaTarefas(() => {
      return []
    })
  }

  function removeTarefa(idTarefa) {
    const handleDeleteTask = listaTarefas.filter(
      tarefa => tarefa.id !== idTarefa
    )
    setListaTarefas(() => handleDeleteTask)
  }

  return (
    <>
      <h1>Gestor de Tarefas</h1>
      <hr />
      <input
        type="text"
        ref={focus}
        value={tarefa}
        onChange={e => {
          return setTarefa(e.target.value)
        }}
      />
      <button onClick={adicionaTarefa}>Adicionar</button>
      <button onClick={removeListaTarefas}>Limpar Tudo</button>
      <hr />
      <h2>Tarefas: </h2>
      {listaTarefas.map(tarefa => {
        return (
          <p key={tarefa.id} className="paragrafo">
            {tarefa.text}{' '}
            <ClearIcon
              onClick={() => {
                removeTarefa(tarefa.id)
              }}
              className="btn"
            />
          </p>
        )
      })}
    </>
  )
}
