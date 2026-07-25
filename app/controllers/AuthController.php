<?php

namespace App\Controllers;

use App\Services\FirebaseAuthService;
use App\Repositories\Database;
use Firebase\JWT\JWT;
use PDO;

class AuthController {

    private FirebaseAuthService $firebaseAuth;

    public function __construct() {
        $this->firebaseAuth = new FirebaseAuthService();
    }

    public function loginView() {
        require __DIR__ . '/../views/auth/login.php';
    }

    public function apiLogin() {
        header('Content-Type: application/json');

        // Pega o body JSON (Fetch API)
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['token'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Token não fornecido.']);
            return;
        }

        $idToken = $input['token'];

        // 1. Validar no Google/Firebase
        $firebaseUser = $this->firebaseAuth->verifyIdToken($idToken);

        if (!$firebaseUser) {
            http_response_code(401);
            echo json_encode(['message' => 'Autenticação inválida.']);
            return;
        }

        $uid = $firebaseUser->sub;
        $email = $firebaseUser->email ?? '';
        $name = $firebaseUser->name ?? explode('@', $email)[0];

        // 2. Procurar ou Criar no Banco Local (MariaDB)
        $db = Database::getInstance();
        
        $stmt = $db->prepare("SELECT id, role, status FROM users WHERE firebase_uid = :uid LIMIT 1");
        $stmt->execute(['uid' => $uid]);
        $user = $stmt->fetch();

        if (!$user) {
            // Auto-criação do usuário
            $stmtInsert = $db->prepare("INSERT INTO users (firebase_uid, name, email) VALUES (:uid, :name, :email)");
            $stmtInsert->execute([
                'uid' => $uid,
                'name' => $name,
                'email' => $email
            ]);
            
            $userId = $db->lastInsertId();
            $role = 'user';
            $status = 1;
        } else {
            $userId = $user['id'];
            $role = $user['role'];
            $status = $user['status'];
        }

        if (!$status) {
            http_response_code(403);
            echo json_encode(['message' => 'Usuário bloqueado no sistema.']);
            return;
        }

        // 3. Gerar o JWT próprio do ERP
        $payload = [
            'iss' => $_ENV['APP_URL'] ?? 'http://localhost',
            'aud' => $_ENV['APP_URL'] ?? 'http://localhost',
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 7), // 7 dias
            'uid' => $userId,
            'role' => $role
        ];

        $erpJwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        // 4. Salvar o token em um Cookie HttpOnly para segurança contra XSS
        setcookie(
            'erp_session', 
            $erpJwt, 
            time() + (60 * 60 * 24 * 7), 
            '/', 
            '', 
            false, // Mudar para true em HTTPS de produção
            true  // HttpOnly = true
        );

        echo json_encode([
            'status' => 'success',
            'message' => 'Login realizado com sucesso!'
        ]);
    }

    public function logout() {
        setcookie('erp_session', '', time() - 3600, '/');
        header('Location: /login');
        exit;
    }
}
