import React, { useState } from 'react';
import API from '../axios/Api';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/index.css';
import EditModal from './EditModal';

function DataTable({ mhs, refresh }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    num_docto: mhs.num_docto,
    fornecedor: mhs.fornecedor,
    dt_lancamento: mhs.dt_lancamento,
    dt_vencimento: mhs.dt_vencimento,
    valor: mhs.valor,
    observacao: mhs.observacao
  });

  const deleteMhs = async () => {
    await API.delete('deletemhs.php?id=' + mhs.id);
    return refresh();
  };

  const deleteConfirm = () => {
    confirmAlert({
      title: 'Confirme a ação',
      message: 'Você deseja excluir o Documento: ' + mhs.num_docto + ' ?',
      buttons: [
        {
          className: 'confirm-delete',
          label: 'Deletar',
          onClick: () => deleteMhs()
        },
        {
          label: 'Não, voltar',
          onClick: () => {}
        }
      ]
    });
  };

  const handleEditModalShow = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormChange = (e) => {
    e.persist(); // Keep the synthetic event persistently available
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await API.put(`/editmhs.php?id=${mhs.id}`, editFormData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      handleEditModalClose();

      // Atualize o estado local do componente DataTable com os novos valores
      setEditFormData({
        num_docto: editFormData.num_docto,
        fornecedor: editFormData.fornecedor,
        dt_lancamento: editFormData.dt_lancamento,
        dt_vencimento: editFormData.dt_vencimento,
        valor: editFormData.valor,
        observacao: editFormData.observacao
      });

      refresh(); // Atualize a tabela após a edição
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="status">
      <td
        style={{
          backgroundColor:
            mhs.situacao === 'Aberto'
              ? 'green'
              : mhs.situacao === 'Vencido'
              ? 'orange'
              : mhs.situacao === 'Recebida'
              ? 'red'
              : ''
        }}
      >
        {mhs.num_docto} {mhs.situacao}
      </td>
      <td>{mhs.fornecedor}</td>
      <td>{mhs.dt_lancamento}</td>
      <td>{mhs.dt_vencimento}</td>
      <td>{mhs.valor}</td>
      <td>{mhs.observacao}</td>
      <td className="action-icons">
        <i
          className="fa fa-pencil-square-o edit"
          id="Edit-icon"
          onClick={handleEditModalShow}
        ></i>

        <i
          className="fa fa-trash delete"
          id="Delete-icon"
          onClick={deleteConfirm}
        ></i>
      </td>

      <EditModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        formData={editFormData} // Atualizado para editFormData em vez de formData
        handleChange={handleEditFormChange} // Atualizado para handleEditFormChange em vez de handleChange
        handleSubmit={handleEditFormSubmit}
      />
    </tr>
  );
}

export default DataTable;
