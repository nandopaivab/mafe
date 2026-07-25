<?php

namespace App\Repositories;

use PDO;
use App\Models\Client;
use Exception;

class ClientRepository {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getAll(string $search = ''): array {
        $query = "SELECT * FROM clients WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $query .= " AND (name LIKE :search OR document LIKE :search OR email LIKE :search)";
            $params['search'] = "%{$search}%";
        }

        $query .= " ORDER BY name ASC";
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = new Client($row);
        }
        return $results;
    }

    public function getById(int $id): ?Client {
        $stmt = $this->db->prepare("SELECT * FROM clients WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        return $row ? new Client($row) : null;
    }

    public function save(Client $client): bool {
        // Verifica se CPF/CNPJ já existe em outro cliente
        if (!empty($client->document)) {
            $stmt = $this->db->prepare("SELECT id FROM clients WHERE document = :doc AND id != :id");
            $stmt->execute(['doc' => $client->document, 'id' => $client->id ?? 0]);
            if ($stmt->fetch()) {
                throw new Exception("Já existe um cliente cadastrado com este CPF/CNPJ.");
            }
        }

        if ($client->id) {
            return $this->update($client);
        } else {
            return $this->insert($client);
        }
    }

    private function insert(Client $client): bool {
        $sql = "INSERT INTO clients (name, document, email, phone, birthdate, zipcode, address, number, complement, neighborhood, city, state, observations, status) 
                VALUES (:name, :document, :email, :phone, :birthdate, :zipcode, :address, :number, :complement, :neighborhood, :city, :state, :observations, :status)";
        
        $stmt = $this->db->prepare($sql);
        $success = $stmt->execute([
            'name' => $client->name,
            'document' => $client->document,
            'email' => $client->email,
            'phone' => $client->phone,
            'birthdate' => $client->birthdate,
            'zipcode' => $client->zipcode,
            'address' => $client->address,
            'number' => $client->number,
            'complement' => $client->complement,
            'neighborhood' => $client->neighborhood,
            'city' => $client->city,
            'state' => $client->state,
            'observations' => $client->observations,
            'status' => (int)$client->status
        ]);

        if ($success) {
            $client->id = (int)$this->db->lastInsertId();
        }
        return $success;
    }

    private function update(Client $client): bool {
        $sql = "UPDATE clients SET 
                name = :name, document = :document, email = :email, phone = :phone, 
                birthdate = :birthdate, zipcode = :zipcode, address = :address, 
                number = :number, complement = :complement, neighborhood = :neighborhood, 
                city = :city, state = :state, observations = :observations, status = :status 
                WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'id' => $client->id,
            'name' => $client->name,
            'document' => $client->document,
            'email' => $client->email,
            'phone' => $client->phone,
            'birthdate' => $client->birthdate,
            'zipcode' => $client->zipcode,
            'address' => $client->address,
            'number' => $client->number,
            'complement' => $client->complement,
            'neighborhood' => $client->neighborhood,
            'city' => $client->city,
            'state' => $client->state,
            'observations' => $client->observations,
            'status' => (int)$client->status
        ]);
    }

    public function delete(int $id): bool {
        // Implementando Soft Delete (apenas muda status)
        $stmt = $this->db->prepare("UPDATE clients SET status = 0 WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
