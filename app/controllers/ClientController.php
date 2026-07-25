<?php

namespace App\Controllers;

use App\Repositories\ClientRepository;
use App\Models\Client;
use Exception;

class ClientController {
    private ClientRepository $repository;

    public function __construct() {
        $this->repository = new ClientRepository();
    }

    // Renderiza a página principal (HTML)
    public function index() {
        global $currentUser;
        require __DIR__ . '/../views/clients/index.php';
    }

    // API: Retorna JSON de clientes
    public function list() {
        header('Content-Type: application/json');
        $search = $_GET['search'] ?? '';
        
        try {
            $clients = $this->repository->getAll($search);
            // Formatar os dados para o JS
            $data = array_map(function($c) {
                return (array) $c;
            }, $clients);
            
            echo json_encode(['status' => 'success', 'data' => $data]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Erro ao buscar clientes.']);
        }
    }

    // API: Salvar (Criar/Editar) JSON
    public function save() {
        header('Content-Type: application/json');
        $inputJSON = file_get_contents('php://input');
        $data = json_decode($inputJSON, true);

        if (empty($data['name'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'O nome é obrigatório.']);
            return;
        }

        try {
            // Limpa formatações do documento
            if (!empty($data['document'])) {
                $data['document'] = preg_replace('/[^0-9]/', '', $data['document']);
            }

            $client = new Client($data);
            $this->repository->save($client);
            
            echo json_encode(['status' => 'success', 'message' => 'Cliente salvo com sucesso!', 'id' => $client->id]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    // API: Desativar (Delete) JSON
    public function delete($id) {
        header('Content-Type: application/json');
        try {
            $this->repository->delete((int)$id);
            echo json_encode(['status' => 'success', 'message' => 'Cliente desativado com sucesso.']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Erro ao desativar cliente.']);
        }
    }
}
