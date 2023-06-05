import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from '../axios/Api';
import InputMask from 'react-input-mask';
import CurrencyInputField from 'react-currency-input-field';
import { AiOutlineClose } from 'react-icons/ai';

function AddModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    num_docto: '',
    fornecedor: '',
    dt_lancamento: '',
    dt_vencimento: '',
    valor: '',
    observacao: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await API.post('/addmhs.php', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data); // Exibe a resposta do servidor no console

      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cadastro</Modal.Title>
        <Button variant="link" className="close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="num_docto">
            <Form.Label>Numero do Documento *</Form.Label>
            <Form.Control
              type="text"
              name="num_docto"
              value={formData.num_docto}
              onChange={handleChange}
              placeholder="001"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fornecedor">
            <Form.Label>Fornecedor *</Form.Label>
            <Form.Control
              type="text"
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleChange}
              placeholder="Fornecedor"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dt_lancamento">
            <Form.Label>Data de Emissão *</Form.Label>
            <InputMask
              mask="9999-99-99"
              className="form-control"
              name="dt_lancamento"
              value={formData.dt_lancamento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dt_vencimento">
            <Form.Label>Data de Vencimento *</Form.Label>
            <InputMask
              mask="9999-99-99"
              className="form-control"
              name="dt_vencimento"
              value={formData.dt_vencimento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="valor">
            <Form.Label>Valor *</Form.Label>
            <CurrencyInputField
              prefix="R$"
              decimalSeparator="."
              groupSeparator=","
              decimalScale={2}
              value={formData.valor}
              onValueChange={(value) => setFormData({ ...formData, valor: value })}
              placeholder="0.00"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="observacao">
            <Form.Label>Observacao</Form.Label>
            <Form.Control
              type="text"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              placeholder="Observação (opcional)"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
