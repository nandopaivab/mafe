<?php

namespace App\Models;

class Client {
    public ?int $id;
    public string $name;
    public ?string $document;
    public ?string $email;
    public ?string $phone;
    public ?string $birthdate;
    public ?string $zipcode;
    public ?string $address;
    public ?string $number;
    public ?string $complement;
    public ?string $neighborhood;
    public ?string $city;
    public ?string $state;
    public ?string $observations;
    public bool $status;
    public ?string $created_at;
    public ?string $updated_at;

    public function __construct(array $data = []) {
        $this->id = $data['id'] ?? null;
        $this->name = $data['name'] ?? '';
        $this->document = $data['document'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->phone = $data['phone'] ?? null;
        $this->birthdate = $data['birthdate'] ?? null;
        $this->zipcode = $data['zipcode'] ?? null;
        $this->address = $data['address'] ?? null;
        $this->number = $data['number'] ?? null;
        $this->complement = $data['complement'] ?? null;
        $this->neighborhood = $data['neighborhood'] ?? null;
        $this->city = $data['city'] ?? null;
        $this->state = $data['state'] ?? null;
        $this->observations = $data['observations'] ?? null;
        $this->status = isset($data['status']) ? (bool)$data['status'] : true;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }
}
